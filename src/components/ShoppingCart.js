import { Component } from "react";
import { Container, Header, Button, Confirm, Label } from "semantic-ui-react";
import { EventNames } from "../Config";
import ShoppingCartRepository from '../data/ShoppingCartRepository';
import ShoppingCart from "./ShoppingCartItemList";
import EventEmitter from "../helpers/eventEmitter";

export default class PointOfSale extends Component {
  shoppingCartItems = new ShoppingCartRepository();

  constructor(props) {
    super(props);
    this.state = {
      items: this.shoppingCartItems.getItemArray(),
      confirmVoidOrderOpen: false,
    };

    EventEmitter.subscribe(
      EventNames.shoppingCartItemsChanged,
      items => this.setState({ items }));

    this.showConfirmVoidOrder = this.showConfirmVoidOrder.bind(this);
    this.closeConfirmVoidOrder = this.closeConfirmVoidOrder.bind(this);
    this.voidOrder = this.voidOrder.bind(this);
  }

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
    
  render = () =>
    <Container>
      <Header as="h1" textAlign="center" content="Shopping Cart" />
      <ShoppingCart />
      <Button.Group>
        <Button positive content="Pay" />
        <Button negative content="Void Order" onClick={this.showConfirmVoidOrder} />
      </Button.Group>
      <Label>${this.getOrderTotal()}</Label>
      <Confirm
        content='Are you sure you want to void the order?'
        cancelButton='Return to Order'
        confirmButton='Void the Order'
        open={this.state.confirmVoidOrderOpen}
        onCancel={this.closeConfirmVoidOrder}
        onConfirm={this.voidOrder}
        />
    </Container>;
}