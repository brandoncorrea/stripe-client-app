import { Component } from "react";
import { Container, Grid, Header, Button, Card, Confirm, Label } from "semantic-ui-react";
import AppRouter from "../AppRouter";
import { EventNames, Routes } from "../Config";
import PriceRepository from "../services/priceRepository";
import LookupItemCard from './LookupItemCard';
import ShoppingCartRepository from '../services/shoppingCartRepository';
import ShoppingCart from "./ShoppingCart";
import EventEmitter from "../helpers/eventEmitter";

export default class PointOfSale extends Component {
  currentId = 0;
  shoppingCartItems = new ShoppingCartRepository();

  constructor(props) {
    super(props);
    this.state = {
      prices: [],
      items: this.shoppingCartItems.getItemArray(),
      confirmVoidOrderOpen: false,
      confirmReturnHomeOpen: false,
      has_more_before: false,
      has_more_after: false,
    };

    PriceRepository
      .getAll()
      .then(res => this.setState({ 
        prices: res.data,
        has_more_after: res.has_more
      }));

    EventEmitter.subscribe(
      EventNames.shoppingCartItemsChanged,
      items => this.setState({ items }));

    this.showConfirmVoidOrder = this.showConfirmVoidOrder.bind(this);
    this.closeConfirmVoidOrder = this.closeConfirmVoidOrder.bind(this);
    this.voidOrder = this.voidOrder.bind(this);
    this.returnToHomepage = this.returnToHomepage.bind(this);
    this.showNextItemSet = this.showNextItemSet.bind(this);
    this.showPrevItemSet = this.showPrevItemSet.bind(this);
  }

  returnToHomepage() {
    if (!this.shoppingCartItems.isEmpty())
      this.setState({ confirmReturnHomeOpen: true });
    else
      AppRouter.navigate(Routes.home);
  }

  closeConfirmReturnHome = () => 
    this.setState({ confirmReturnHomeOpen: false });

  addItem = price =>
    this.shoppingCartItems.addItem(price);

  removeItem = priceId => 
    this.shoppingCartItems.voidItem(priceId);

  showConfirmVoidOrder() {
    if (!this.shoppingCartItems.isEmpty())
      this.setState({ confirmVoidOrderOpen: true });
  }

  closeConfirmVoidOrder = () => 
    this.setState({ confirmVoidOrderOpen: false });
  
  voidOrder = () => {
    this.shoppingCartItems.clearAllItems();
    this.closeConfirmVoidOrder();
  };

  getOrderTotal = () => 
    (this.state.items
      .reduce((cur, price) => cur + price.unit_amount * price.count, 0) 
      / 100)
    .toFixed(2);
  
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
    
  render = () =>
    <Container>
      <Header as="h1" textAlign="center" content="Point of Sale" />
      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column style={{ overflow: 'auto', height: '600px' }}>
            <Card.Group itemsPerRow={3} style={{ padding: '10px' }}>
              {
                this.state.prices.map(i =>
                  <LookupItemCard 
                    key={i.id}
                    price={i}
                    onClick={() => this.addItem(Object.assign({}, i))} />)
              }
            </Card.Group>
          </Grid.Column>
          <Grid.Column style={{ overflow: 'auto', height: '600px' }}>
            <ShoppingCart />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Button 
              onClick={this.showPrevItemSet} 
              content="Previous" 
              disabled={!this.state.has_more_before} />
            <Button 
              onClick={this.showNextItemSet} 
              content="Next"
              disabled={!this.state.has_more_after} />
          </Grid.Column>
          <Grid.Column>
            <Button positive content="Pay" />
            <Button negative content="Void Order" onClick={this.showConfirmVoidOrder} />
            <Button content="Back" onClick={this.returnToHomepage} />
            <Label>${this.getOrderTotal()}</Label>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Confirm
        content='Are you sure you want to void the order?'
        cancelButton='Return to Order'
        confirmButton='Void the Order'
        open={this.state.confirmVoidOrderOpen}
        onCancel={this.closeConfirmVoidOrder}
        onConfirm={this.voidOrder}
        />
      <Confirm
        content='Are you sure you want to exit to the Homepage? The current order will be voided.'
        cancelButton='Return to Order'
        confirmButton='Void and Exit'
        open={this.state.confirmReturnHomeOpen}
        onCancel={this.closeConfirmReturnHome}
        onConfirm={() => {
          this.shoppingCartItems.clearAllItems();
          AppRouter.navigate(Routes.home);
        }}
        />
    </Container>;
}