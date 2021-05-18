import React, { Component } from 'react';
import ItemTile from '../../../../components/itemTile/itemTile';
import ProductRepository from '../../../../services/productRepository';

class ItemList extends Component {
  state = {
    products: []
  };

  componentDidMount = () =>
    ProductRepository
      .getProducts()
      .then(i => this.setState({ products: i }));

  render = () =>
    this.state.products.map(i =>
        <ItemTile 
          key={i.id}
          name={i.name}
          description={i.description} />);
}

export default ItemList;
