import { Component } from "react";
import { Routes } from "../Config";
import { Card } from 'semantic-ui-react';
import AppRouter from "../AppRouter";

export default class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: props.product
    }
  }

  navigateToEditItem = () =>
    AppRouter.navigate(
      Routes.editItem + 
      '?id=' + 
      this.state.product.id);

  render = () =>
    <Card fluid 
      onClick={this.navigateToEditItem}
      color={
        this.state.product.active 
          ? 'green' 
          : 'red'
      }>
      <Card.Content>
        <Card.Header>{this.state.product.name}</Card.Header>
        <Card.Description>{this.state.product.description}</Card.Description>
      </Card.Content>
    </Card> 
}