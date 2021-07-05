import { Component } from "react";
import { Button, List } from 'semantic-ui-react';
import ShoppingCartRepository from "../data/shoppingCartRepository";

export default class ShoppingCartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: props.price
    };
  }

  // Voids this item from the Shopping Cart Repository
  voidItem = () =>
    new ShoppingCartRepository().voidItem(this.state.price.id);

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
        <List.Item>
          <List.Content>
            <Button 
              negative 
              content='Void' 
              onClick={this.voidItem} />
          </List.Content>
        </List.Item>
      </List>
    </List.Item>
}