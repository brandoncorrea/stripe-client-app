import { Component } from "react";
import { Icon, Table } from 'semantic-ui-react';
import ShoppingCartRepository from "../data/ShoppingCartRepository";

export default class ShoppingCartItem extends Component {
  shoppingCart = new ShoppingCartRepository();

  constructor(props) {
    super(props);
    this.state = {
      sku: props.sku
    };
  }

  // Voids this item from the Shopping Cart Repository
  voidItem = () =>
    this.shoppingCart.voidItem(this.state.sku.id);

  // Adds an item to the shopping cart
  addItem = () =>
    this.shoppingCart.addItem(this.state.sku);

  // 
  render = () => 
    <Table.Row>
      <Table.Cell>{this.state.sku.product.name}</Table.Cell>
      <Table.Cell>{this.state.sku.count} @ ${(this.state.sku.price / 100).toFixed(2)}</Table.Cell>
      <Table.Cell>${(this.state.sku.price * this.state.sku.count / 100).toFixed(2)}</Table.Cell>
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