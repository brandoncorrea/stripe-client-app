import { Component } from "react";
import { Container, Header, Button, Confirm } from "semantic-ui-react";
import { EventNames, Routes } from "../Config";
import ShoppingCartRepository from '../data/ShoppingCartRepository';
import ShoppingCartItemList from "./ShoppingCartItemList";
import EventEmitter from "../helpers/eventEmitter";
import TransactionHandler from "../data/TransactionHandler";
import AppRouter from "../AppRouter";

export default class ShoppingCart extends Component {
  shoppingCartItems = new ShoppingCartRepository();
  transactionHandler = new TransactionHandler();

  constructor(props) {
    super(props);
    this.state = {
      orderTotal: this.transactionHandler.getOrderTotal(),
      itemCount: this.transactionHandler.getItemCount(),
      confirmVoidOrderOpen: false,
    };

    EventEmitter.subscribe(
      EventNames.shoppingCartItemsChanged,
      () => this.setState({ 
        orderTotal: this.transactionHandler.getOrderTotal(),
        itemCount: this.transactionHandler.getItemCount()
       })
      );

    this.openPayMenu = this.openPayMenu.bind(this);
    this.showConfirmVoidOrder = this.showConfirmVoidOrder.bind(this);
    this.closeConfirmVoidOrder = this.closeConfirmVoidOrder.bind(this);
    this.voidOrder = this.voidOrder.bind(this);
  }

  openPayMenu() {
    if (this.state.itemCount > 0)
      AppRouter.navigate(Routes.checkout);
  }

  showConfirmVoidOrder() {
    if (!this.shoppingCartItems.isEmpty())
      this.setState({ confirmVoidOrderOpen: true });
  }

  closeConfirmVoidOrder = () => 
    this.setState({ confirmVoidOrderOpen: false });
  
  voidOrder = () => {
    this.transactionHandler.void();
    this.closeConfirmVoidOrder();
  };

  render = () =>
    <Container>
      <Header as="h1" textAlign="center" content="Shopping Cart" />
      {
        // Display the current items or a message if no items exist
        this.state.itemCount > 0
        ? <ShoppingCartItemList />
        : <Header as='h3' textAlign="center" content="Shopping Cart is Empty" />
      }
      <Button.Group fluid>
        <Button content={`${this.state.itemCount} items for $${this.state.orderTotal}`} />
        <Button
          positive 
          disabled={this.state.itemCount === 0}
          content="Pay" 
          onClick={this.openPayMenu}
          />
        <Button 
          negative 
          content="Void Order" 
          disabled={this.state.itemCount === 0}
          onClick={this.showConfirmVoidOrder} />
      </Button.Group>
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