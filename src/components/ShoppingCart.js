import { Component } from "react";
import EventEmitter from "../helpers/eventEmitter";
import ShoppingCartRepository from "../services/shoppingCartRepository";
import ShoppingCartItem from './ShoppingCartItem';
import { EventNames } from '../Config';
import { List } from 'semantic-ui-react';
import Guid from "../helpers/Guid";

export default class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: new ShoppingCartRepository().getItemArray(),
    };

    EventEmitter.subscribe(
      EventNames.shoppingCartItemsChanged, 
      items => this.setState({ items }));
  }

  render = () =>
    <List divided verticalAlign='middle'>
      {
        this.state.items.map(price => 
          <List.Item key={Guid.newGuid()}>
            <ShoppingCartItem price={price} />
          </List.Item>)
      }
    </List>
}