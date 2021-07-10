import { Component } from "react";
import { Statistic, Header, Container } from "semantic-ui-react";
import AppRouter from "../AppRouter";

export default class OrderComplete extends Component {

  constructor(props) {
    super(props);
    this.state = {
      orderTotal: Number(AppRouter.getSearchParam('orderTotal')),
      itemCount: Number(AppRouter.getSearchParam('itemCount')),
      tenderAmount: Number(AppRouter.getSearchParam('tenderAmount')),
      change: 0,
    };

    this.state.change = this.state.tenderAmount - this.state.orderTotal;
  }

  render = () => 
    <Container>
      <Header as='h1' textAlign='center'>Order Complete</Header>
      <Header as='h2' textAlign='center'>Thank You</Header>
      <Statistic.Group horizontal>
        <Statistic>
          <Statistic.Value>{this.state.itemCount}</Statistic.Value>
          <Statistic.Label>Items</Statistic.Label>
        </Statistic>
        <Statistic>
          <Statistic.Value>${this.state.orderTotal.toFixed(2)}</Statistic.Value>
          <Statistic.Label>Total</Statistic.Label>
        </Statistic>
        <Statistic>
          <Statistic.Value>${this.state.tenderAmount.toFixed(2)}</Statistic.Value>
          <Statistic.Label>Paid</Statistic.Label>
        </Statistic>
        <Statistic>
          <Statistic.Value>${this.state.change.toFixed(2)}</Statistic.Value>
          <Statistic.Label>Change</Statistic.Label>
        </Statistic>
      </Statistic.Group>
    </Container>
}