import { Component } from "react";
import { Card, Button, Message, Form } from 'semantic-ui-react';
import { EventNames } from "../Config";
import ProductRepository from "../data/ProductRepository";
import EventEmitter from "../helpers/eventEmitter";
import ProductCard from "./ProductCard";

export default class ProductList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      products: [],
      has_more: false,
    };

    EventEmitter.subscribe(
      EventNames.productDeleted,
      product => this.setState({
        products: this.state.products.filter(i => i.id !== product)
      }));
  }
  
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
