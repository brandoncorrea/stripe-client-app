import { Component } from "react";
import { Button } from 'semantic-ui-react';
import ProductRepository from "../data/ProductRepository";

export default class ActivationToggle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: props.product,
      onChange: props.onChange
    }
  }

  triggerOnChange(product) {
    this.setState({ product });
    this.state.onChange &&
    this.state.onChange(product);
  }

  onActivateClicked = () => 
    ProductRepository
      .activate(this.state.product.id)
      .then(i => this.triggerOnChange(i));

  onDeactivateClicked = () => 
    ProductRepository
      .deactivate(this.state.product.id)
      .then(i => this.triggerOnChange(i));

  render = () =>
    this.state.product.active 
    ?
    <Button basic fluid
      color='green'
      content='Active'
      onClick={this.onDeactivateClicked}
      />
    :
    <Button basic fluid
      color='red'
      content='Inactive'
      onClick={this.onActivateClicked}
      />
}