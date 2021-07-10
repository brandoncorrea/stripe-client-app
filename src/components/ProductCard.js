import { Component } from "react";
import { Card, Button } from 'semantic-ui-react';
import AppRouter from "../AppRouter";
import { EventNames, Routes } from "../Config";
import ProductRepository from "../data/ProductRepository";
import EventEmitter from "../helpers/eventEmitter";

export default class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      product: props.product,
      errorMessage: ''
    }

    this.deleteProduct = this.deleteProduct.bind(this);
  }

  navigateToUpdateProduct = () =>
    AppRouter.navigate(Routes.updateProduct + '?productId=' + this.state.product.id);

  deleteProduct = () =>
    ProductRepository
      .delete(this.state.product.id)
      .then(res => {
        if (res.error)
          EventEmitter.dispatch(EventNames.productDeletedError, {
            error: res.error,
            product: this.state.product.id
          });
        else
          EventEmitter.dispatch(EventNames.productDeleted, this.state.product.id);
      });

  render = () =>
    <Card fluid>
      <Card.Content>
        <Card.Header content={this.state.product.name} />
        <Card.Description content={this.state.product.description} />
        <Card.Meta>{this.state.errorMessage}</Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <Button.Group fluid>
          <Button basic positive
            content='Update'
            onClick={this.navigateToUpdateProduct} />
          <Button basic negative 
            content='Delete'
            onClick={this.deleteProduct} />
        </Button.Group>
      </Card.Content>
    </Card>;
}