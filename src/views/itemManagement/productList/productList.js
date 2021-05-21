import { Component } from "react";
import { Card } from 'semantic-ui-react';
import ProductRepository from "../../../services/productRepository";
import ProductCard from "../productCard/productCard";

export default class ProductList extends Component {

  state = {
    products: []
  };
  
  componentDidMount = () =>
    ProductRepository
      .getAll()
      .then(i => this.setState({ products: i }));

  render = () =>
    !this.state.products || this.state.products.length === 0
      ? <p>No products available.</p>
      :
      <Card.Group>
        {
          this.state.products.map(i =>
            <ProductCard product={i} />)
        }
      </Card.Group>
}