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

  render = () => 
    <Card fluid 
      onClick={this.navigateToEditPrice}
      color={
        this.state.price.active 
          ? 'green' 
          : 'red'
      }>
      <Card.Content>
        <Card.Header content={
          (this.state.price.unit_amount / 100) +
          ' ' +
          this.state.price.currency +
          ' ' +
          this.state.price.billing_scheme
        } />
        <Card.Description content={
          this.state.price.type
        } />
      </Card.Content>
    </Card> 
}