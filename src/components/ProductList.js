import { Component } from "react";
import { Card, Button, Form, Message } from 'semantic-ui-react';
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
    <Form.Field>
      {
        this.state.products && 
        this.state.products.length > 0 &&
        <Card.Group>
          {
            this.state.products.map(i =>
              <ProductCard 
              key={i.id}
              product={i} />)
            }
        </Card.Group>
      }
    </Form.Field>;

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
        <Form.Field>
          <Button 
            fluid
            onClick={this.onHasMoreClicked}
            content='More...' />
        </Form.Field>
      :
        <Message>
          No more items to display!
        </Message>;

  render = () =>
    <>
      <this.ItemField />
      <this.ButtonField />
    </>;
}
