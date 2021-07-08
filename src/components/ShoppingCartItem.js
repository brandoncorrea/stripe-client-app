import { Component } from "react";
import { Button, Icon, Table } from 'semantic-ui-react';
import ShoppingCartRepository from "../data/ShoppingCartRepository";

export default class ShoppingCartItem extends Component {
  shoppingCart = new ShoppingCartRepository();

  constructor(props) {
    super(props);
    this.state = {
      price: props.price
    };
  }

  // Voids this item from the Shopping Cart Repository
  voidItem = () =>
    this.shoppingCart.voidItem(this.state.price.id);

  // Adds an item to the shopping cart
  addItem = () =>
    this.shoppingCart.addItem(this.state.price);

  // 
  render = () => 
    <Table.Row>
      <Table.Cell>{this.state.price.product.name}</Table.Cell>
      <Table.Cell>{this.state.price.count} @ ${(this.state.price.unit_amount / 100).toFixed(2)}</Table.Cell>
      <Table.Cell>${(this.state.price.unit_amount * this.state.price.count / 100).toFixed(2)}</Table.Cell>
      <Table.Cell>
        <Icon 
          name='minus'
          style={{ cursor: 'pointer' }}
          onClick={this.voidItem}/>
      </Table.Cell>
      <Table.Cell>
        <Icon 
          name='plus'
          style={{ cursor: 'pointer' }}
          onClick={this.addItem}/>
      </Table.Cell>
    </Table.Row>
}