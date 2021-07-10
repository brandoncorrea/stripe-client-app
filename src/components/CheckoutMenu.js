import { Component } from "react";
import { Statistic, Divider, Button, Header, Container } from "semantic-ui-react";
import AppRouter from "../AppRouter";
import { EventNames, Routes } from "../Config";
import TransactionHandler from "../data/TransactionHandler";
import EventEmitter from "../helpers/eventEmitter";

export default class CheckoutMenu extends Component {
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

    this.tenderCash = this.tenderCash.bind(this);
    this.tenderManualCard = this.tenderManualCard.bind(this);
  }

  tenderCash() {

  }

  tenderManualCard() {
    AppRouter.navigate(Routes.manualCardTender);
  }

  render = () =>
    <Container>
      <Header as='h1' textAlign='center' content='Checkout' />
      <Statistic size='small'>
        <Statistic.Label>Items</Statistic.Label>
        <Statistic.Value>{this.state.itemCount}</Statistic.Value>
      </Statistic>
      <Statistic size='small'>
        <Statistic.Label>Order Total</Statistic.Label>
        <Statistic.Value>${this.state.orderTotal}</Statistic.Value>
      </Statistic>
      <Divider />
      <Button 
        fluid 
        size='huge' 
        content='Cash' 
        onClick={this.tenderCash}
        />
      <Button 
        fluid 
        size='huge' 
        content='Manual Card' 
        onClick={this.tenderManualCard}
        />
    </Container>
}