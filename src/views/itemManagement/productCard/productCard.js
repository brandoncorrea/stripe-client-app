import { Component } from "react";
import { navigate } from "../../../AppRouter";
import { Routes } from "../../../Config";
import { Card } from 'semantic-ui-react';

export default class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: props.product
    }
  }

  navigateToEditItem = () =>
    navigate(
      Routes.editItem + 
      '?id=' + 
      this.state.product.id);

  render = () =>
    <Card fluid onClick={this.navigateToEditItem}>
      <Card.Content>
        <Card.Header>{this.state.product.name}</Card.Header>
        <Card.Description>{this.state.product.description}</Card.Description>
      </Card.Content>
    </Card> 
}