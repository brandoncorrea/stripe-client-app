import { Component } from "react";
import EventEmitter from "../helpers/eventEmitter";
import ShoppingCartRepository from "../data/ShoppingCartRepository";
import ShoppingCartItem from './ShoppingCartItem';
import { EventNames } from '../Config';
import { Table } from 'semantic-ui-react';
import Guid from "../helpers/Guid";

export default class ShoppingCartItemList extends Component {
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
  <Table unstackable>
    <Table.Body>
      {
        this.state.items.map(sku =>
          <ShoppingCartItem 
            key={Guid.newGuid()}
            sku={sku} />)
      }
    </Table.Body>
  </Table>
}