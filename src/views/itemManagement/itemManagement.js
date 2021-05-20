import './itemManagement.css'
import { Link } from 'react-router-dom';
import React from 'react';
import ProductRepository from '../../services/productRepository';
import ItemTile from '../../components/itemTile/itemTile';
import { Routes } from '../../Config';

export default class ItemManagement extends React.Component {  

  state = {
    products: []
  };

  componentDidMount = () =>
    ProductRepository
      .getAll()
      .then(i => this.setState({ products: i }));

  render = () =>
    <div className="ItemManagement">
      <header className="ItemManagement-header">
        {
          // Are there any items?
          this.state.products && this.state.products.length > 0
            
            ? this.state.products.map(i =>
              <Link to={Routes.editItem + '?id=' + i.id}>
                <ItemTile
                  key={i.id}
                  name={i.name}
                  description={i.description} />
              </Link>)
            
            : <p>No items to display.</p>
        }
        <Link to={Routes.createItem} className="btn">New Item</Link>
      </header>
    </div>;
}
