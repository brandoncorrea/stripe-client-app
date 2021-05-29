import { Component } from "react";
import { Card, Button, Message, Form } from 'semantic-ui-react';
import ProductRepository from "../services/productRepository";
import ProductCard from "./ProductCard";

export default class ProductList extends Component {

  state = {
    products: [],
    has_more: false,
  };
  
  componentDidMount = () =>
    ProductRepository
      .getAll()
      .then(i => this.setState({ 
        products: i.data,
        has_more: i.has_more 
      }));

  ItemField = () =>
    this.state.products && 
    this.state.products.length > 0 &&
    <Card.Group itemsPerRow={2}>
      {
        this.state.products.map(i =>
          <ProductCard 
          key={i.id}
          product={i} />)
        }
    </Card.Group>

  onHasMoreClicked = event => {
    event.preventDefault();
    var lastIndex = this.state.products.length - 1;
    var productId = this.state.products[lastIndex].id;
    ProductRepository
      .getAfter(productId)
      .then(res => {
        var products = this.state.products.concat(res.data);
        this.setState({
          products,
          has_more: res.has_more
        });
      });
  }
  
  ButtonField = () =>
      this.state.has_more
      ?
        <Button fluid
          onClick={this.onHasMoreClicked}
          content='More...' />
      :
        <Message>
          No more items to display!
        </Message>;

  render = () =>
    <>
      <Form.Field>
        <this.ItemField />
      </Form.Field>
      <Form.Field>
        <this.ButtonField />
      </Form.Field>
    </>;
}
