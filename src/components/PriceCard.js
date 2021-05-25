import { Component } from "react";
import { Card } from 'semantic-ui-react';
import AppRouter from "../AppRouter";
import { Routes } from "../Config";

export default class PriceCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: props.price
    }
  }

  getCardColor = () =>
    this.state.price.active
      ? 'green'
      : 'red';

  getFormattedPrice = () =>
    '$' + (this.state.price.unit_amount / 100).toFixed(2);

  render = () =>
    <Card 
      fluid 
      color={this.getCardColor()}
      onClick={() => AppRouter.navigate(Routes.updatePrice + '?priceId=' + this.state.price.id)}>
      <Card.Content>
        <Card.Header content={this.getFormattedPrice()} />
        <Card.Description content={this.state.price.nickname} />
      </Card.Content>
    </Card>;
}