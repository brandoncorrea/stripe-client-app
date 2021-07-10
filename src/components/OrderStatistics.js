import { Component } from "react";
import { Statistic } from 'semantic-ui-react';
import EventEmitter from '../helpers/eventEmitter';
import { EventNames } from '../Config';
import TransactionHandler from '../data/TransactionHandler';

export default class OrderStatistics extends Component {
  transactionHandler = new TransactionHandler();

  constructor(props) {
    super(props);
    this.state = {
      orderTotal: this.transactionHandler.getOrderTotal(),
      itemCount: this.transactionHandler.getItemCount()
    }

    EventEmitter.subscribe(
      EventNames.shoppingCartItemsChanged,
      () => this.setState({ 
        orderTotal: this.transactionHandler.getOrderTotal(),
        itemCount: this.transactionHandler.getItemCount()
      }));
  }

  render = () =>
    <>
      <Statistic size='small'>
        <Statistic.Label>Items</Statistic.Label>
        <Statistic.Value>{this.state.itemCount}</Statistic.Value>
      </Statistic>
      <Statistic size='small'>
        <Statistic.Label>Order Total</Statistic.Label>
        <Statistic.Value>${this.state.orderTotal.toFixed(2)}</Statistic.Value>
      </Statistic>
    </>
}