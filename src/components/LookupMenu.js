import { Component } from "react";
import { Container, Card, Button, Header } from 'semantic-ui-react';
import LookupItemCard from './LookupItemCard';
import ShoppingCartRepository from '../data/ShoppingCartRepository';
import TransactionHandler from "../data/TransactionHandler";
import EventEmitter from "../helpers/eventEmitter";
import { EventNames } from "../Config";
import SkuRepository from "../data/SkuRepository";

export default class LookupMenu extends Component {
  shoppingCartItems = new ShoppingCartRepository();
  transactionHandler = new TransactionHandler();
  skuRepo = new SkuRepository();

  constructor(props) {
    super(props);
    this.state = {
      skus: [],
      has_more_after: false,
      has_more_before: false,
      itemCount: this.transactionHandler.getItemCount(),
      orderTotal: this.transactionHandler.getOrderTotal()
    }

    this.skuRepo
      .getAll()
      .then(res => this.setState({ 
        skus: res.data,
        has_more_after: res.has_more
      }));

    EventEmitter.subscribe(EventNames.shoppingCartItemsChanged,
      () => this.setState({
        itemCount: this.transactionHandler.getItemCount(),
        orderTotal: this.transactionHandler.getOrderTotal()
      }));

    this.showPrevItemSet = this.showPrevItemSet.bind(this);
    this.showNextItemSet = this.showNextItemSet.bind(this);
    this.addItem = this.addItem.bind(this);
  }
  
  showPrevItemSet() {
    if (this.state.skus.length < 1 || !this.state.has_more_before) 
      return;

    this.skuRepo.getAllBefore(this.state.skus[0].id)
    .then(res => this.setState({
      skus: res.data,
      has_more_before: res.has_more,
      has_more_after: true
    }));
  }

  showNextItemSet() {
    if (this.state.skus.length < 1 || !this.state.has_more_after)
      return;
      
    this.skuRepo.getAllAfter(this.state.skus[this.state.skus.length - 1].id)
      .then(res => this.setState({
        skus: res.data,
        has_more_before: true,
        has_more_after: res.has_more
      }));
  }
  
  addItem = sku =>
    this.shoppingCartItems.addItem(sku);

  render = () =>
    <Container>
      <Header as='h1' textAlign='center' content='Lookup' />
      <Card.Group itemsPerRow={2} style={{ padding: '10px' }}>
        {
          this.state.skus.map(i =>
            <LookupItemCard 
              key={i.id}
              sku={i}
              onClick={() => this.addItem(Object.assign({}, i))} />)
        }
      </Card.Group>
      <Button.Group fluid>
        <Button 
          onClick={this.showPrevItemSet} 
          content="Previous" 
          disabled={!this.state.has_more_before} />
        <Button 
          content={`${this.state.itemCount} items for $${this.state.orderTotal.toFixed(2)}`}/>
        <Button 
          onClick={this.showNextItemSet} 
          content="Next"
          disabled={!this.state.has_more_after} />
      </Button.Group>
    </Container>
}