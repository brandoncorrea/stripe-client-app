import { Component } from "react";
import { Card, Button } from 'semantic-ui-react';
import AppRouter from "../AppRouter";
import { Routes } from "../Config";
import ProductRepository from "../data/ProductRepository";
import ConditionalIcon from "./ConditionalIcon";

export default class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      product: props.product,
    }

    this.deleteProduct = this.deleteProduct.bind(this);
  }

  navigateToUpdateProduct = () =>
    AppRouter.navigate(Routes.updateProduct + '?productId=' + this.state.product.id);

  deleteProduct = () =>
    ProductRepository
      .delete(this.state.product.id)
      .then(res => console.log(res));

  render = () =>
    <Card fluid>
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