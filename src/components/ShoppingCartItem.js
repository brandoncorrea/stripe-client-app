import { Component } from "react";
import { Button, List, Icon } from 'semantic-ui-react';
import ShoppingCartRepository from "../data/ShoppingCartRepository";
import ShoppingCart from "./ShoppingCartItemList";

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
    <List.Item>
      <List divided horizontal>
        <List.Item>
          <List.Content>{this.state.price.product.name}</List.Content>
        </List.Item>
        <List.Item>
          <List.Content>{this.state.price.count} @ ${(this.state.price.unit_amount / 100).toFixed(2)}</List.Content>
        </List.Item>
        <List.Item>
          <List.Content>${(this.state.price.unit_amount * this.state.price.count / 100).toFixed(2)}</List.Content>
        </List.Item>
      </List>

      <Button 
        positive 
        floated='right'
        content={<Icon name='plus' />}
        onClick={this.addItem} />
      <Button
        negative 
        floated='right'
        content={<Icon name='minus' />} 
        onClick={this.voidItem} />
    </List.Item>
}