import { Component } from "react";
import { Card } from 'semantic-ui-react';
import AppRouter from "../AppRouter";
import { Routes } from "../Config";
import PriceRepository from "../data/PriceRepository";
import ConditionalIcon from "./ConditionalIcon";

export default class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      product: props.product,
      price: {
        unit_amount: 0
      },
    }

    PriceRepository
      .getActive(this.state.product.id)
      .then(prices => {
        if (prices.length > 0)
          this.setState({ price: prices[0] });
        this.forceUpdate();
      });
  }

  getCardColor = () =>
    this.state.product.active
      ? 'green' 
      : 'red';

  navigateToUpdateProduct = () =>
    AppRouter.navigate(Routes.updateProduct + '?productId=' + this.state.product.id);

  render = () =>
    <Card 
      fluid 
      color={this.getCardColor()}
      onClick={this.navigateToUpdateProduct}>
      <Card.Content>
        <Card.Header content={this.state.product.name} />
        <Card.Meta>
          <ConditionalIcon 
            condition={this.state.product.metadata.cafe}
            name="coffee"
            />
          <ConditionalIcon 
            condition={this.state.product.metadata.resource}
            name="registered"
            />
          <ConditionalIcon 
            condition={this.state.product.metadata.web}
            name="globe"
            />
        </Card.Meta>
        <Card.Description content={this.state.product.description} />
      </Card.Content>
    </Card>;
}