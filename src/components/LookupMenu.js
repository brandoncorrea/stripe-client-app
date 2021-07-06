import { Component } from "react";
import { Container, Card, Button, Header, Label } from 'semantic-ui-react';
import LookupItemCard from './LookupItemCard';
import PriceRepository from '../data/PriceRepository';
import ShoppingCartRepository from '../data/ShoppingCartRepository';
import TransactionHandler from "../data/TransactionHandler";
import EventEmitter from "../helpers/eventEmitter";
import { EventNames } from "../Config";

export default class LookupMenu extends Component {
  shoppingCartItems = new ShoppingCartRepository();
  transactionHandler = new TransactionHandler();


  constructor(props) {
    super(props);
    this.state = {
      prices: [],
      has_more_after: false,
      has_more_before: false,
      itemCount: this.transactionHandler.getItemCount(),
      orderTotal: this.transactionHandler.getOrderTotal()
    }

    PriceRepository
      .getAll()
      .then(res => this.setState({ 
        prices: res.data,
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
    if (this.state.prices.length < 1 || !this.state.has_more_before) 
      return;

    PriceRepository
    .getAllBefore(this.state.prices[0].id)
    .then(res => this.setState({
      prices: res.data,
      has_more_before: res.has_more,
      has_more_after: true
    }));
  }

  showNextItemSet() {
    if (this.state.prices.length < 1 || !this.state.has_more_after)
      return;
      
    PriceRepository
    .getAllAfter(this.state.prices[this.state.prices.length - 1].id)
    .then(res => this.setState({
      prices: res.data,
      has_more_before: true,
      has_more_after: res.has_more
    }));
  }
  
  addItem = price =>
    this.shoppingCartItems.addItem(price);

  render = () =>
    <Container>
      <Header as='h1' textAlign='center' content='Lookup' />
      <Card.Group itemsPerRow={2} style={{ padding: '10px' }}>
        {
          this.state.prices.map(i =>
            <LookupItemCard 
              key={i.id}
              price={i}
              onClick={() => this.addItem(Object.assign({}, i))} />)
        }
      </Card.Group>
      <Label>{this.state.itemCount} items for ${this.state.orderTotal}</Label>
      <Button.Group fluid widths='2'>
        <Button 
          onClick={this.showPrevItemSet} 
          content="Previous" 
          disabled={!this.state.has_more_before} />
        <Button 
          onClick={this.showNextItemSet} 
          content="Next"
          disabled={!this.state.has_more_after} />
      </Button.Group>
    </Container>
}