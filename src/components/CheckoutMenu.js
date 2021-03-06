import { Component } from "react";
import { Divider, Button, Header, Container } from "semantic-ui-react";
import AppRouter from "../AppRouter";
import { Routes } from "../Config";
import TransactionHandler from "../data/TransactionHandler";
import OrderStatistics from "./OrderStatistics";

export default class CheckoutMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderTotal: new TransactionHandler().getOrderTotal()
    }
    this.tenderCash = this.tenderCash.bind(this);
    this.tenderManualCard = this.tenderManualCard.bind(this);
  }

  tenderCash = () =>
    AppRouter.navigate(Routes.cashTender);

  tenderManualCard = () =>
    AppRouter.navigate(Routes.manualCardTender);

  render = () =>
    <Container>
      <Header as='h1' textAlign='center' content='Checkout' />
      <OrderStatistics />
      <Divider />
      <Button 
        fluid 
        size='huge' 
        content='Cash' 
        onClick={this.tenderCash}
        />
      <Button 
        disabled={this.state.orderTotal <= 0}
        fluid 
        size='huge' 
        content='Manual Card' 
        onClick={this.tenderManualCard}
        />
    </Container>
}