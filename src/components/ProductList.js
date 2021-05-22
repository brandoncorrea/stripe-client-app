import { Component } from "react";
import { Card } from 'semantic-ui-react';
import ProductRepository from "../services/productRepository";
import ProductCard from "./ProductCard";

export default class ProductList extends Component {

  state = {
    products: []
  };
  
  componentDidMount = () =>
    ProductRepository
      .getAll()
      .then(i => this.setState({ products: i }));

  render = () =>
    this.state.products && 
    this.state.products.length > 0 &&
    <Card.Group>
      {
        this.state.products.map(i =>
          <ProductCard 
            key={i.id}
            product={i} />)
      }
    </Card.Group>;
}