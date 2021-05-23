import { Component } from "react";
import { Card } from 'semantic-ui-react';
// import AppRouter from "../AppRouter";
// import { Routes } from "../Config";

export default class PriceCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      price: props.price
    }
  }

  navigateToEditPrice = () => {
    // AppRouter.navigate(Routes.UpdatePrice + '?priceId=' + this.state.price.id);
  }

  getCurrencySymbol = () =>
    this.state.price.currency !== 'usd' 
      ? this.state.price.currency
      : '$';
  
  getFormattedPrice = () => 
    this.getCurrencySymbol() +
    (this.state.price.unit_amount / 100)
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  getUnitText = () =>
    this.state.price.billing_scheme === 'per_unit'
      ? 'Each'
      : this.state.price.billing_scheme;

  getHeaderText = () =>
    this.getFormattedPrice() +
    ' ' +
    this.getUnitText();

  getDescription = () =>
    this.state.price.type === 'one_time'
      ? 'One Time'
    : this.state.price.type === 'recurring'
      ? 'Recurring'
    : this.state.price.type;

  getCardColor = () =>
    this.state.price.active 
      ? 'green' 
      : 'red';
  
  render = () => 
    <Card fluid 
      onClick={this.navigateToEditPrice}
      color={this.getCardColor()}>
      <Card.Content>
        <Card.Header content={this.getHeaderText()} />
        <Card.Description content={this.getDescription()} />
      </Card.Content>
    </Card> 
}