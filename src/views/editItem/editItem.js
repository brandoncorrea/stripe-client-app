import { Component } from 'react';
import ProductRepository from '../../services/productRepository';
import './editItem.css';
import UpdateProductRequest from '../../models/updateProductRequest';
import Product from '../../models/product';
import AppRouter from '../../AppRouter';
import { Routes } from '../../Config';

export default class EditItem extends Component {

  constructor(props) {
    super(props);

    this.state = {
      product: new Product()
    };

    var productId = new URLSearchParams(window.location.search).get('id');
    if (productId == null)
      AppRouter.navigate(Routes.itemManagement);

    ProductRepository
      .get(productId)
      .then(product => {
        if (product.error)
          AppRouter.navigate(Routes.itemManagement);
        else
          this.setState({ product });
      });
      
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleUpdateClick = this.handleUpdateClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  handleUpdateClick() {
    var request = new UpdateProductRequest();
    request.id = this.state.product.id;
    request.name = document.getElementById('nameInput').value;
    request.description = document.getElementById('descriptionInput').value;

    ProductRepository
      .update(request)
      .then(() => AppRouter.navigate(Routes.itemManagement));
  }

  handleDeleteClick = () =>
    ProductRepository
      .delete(this.state.product.id)
      .then(success =>{
        if (success)
          AppRouter.navigate(Routes.itemManagement);
      });

  handleNameChange(event) {
    var product = this.state.product;
    product.name = event.target.value;
    this.setState({ product });
  }

  handleDescriptionChange(event) {
    var product = this.state.product;
    product.description = event.target.value;
    this.setState({ product })
  }

  render = () =>
    <div className="EditItem">
      <div>
        <label htmlFor="nameInput">Name: </label>
        <input 
          id="nameInput" 
          type="text" 
          onChange={this.handleNameChange}
          value={
            this.state.product 
              ? this.state.product.name
              : ''
            } 
        />
      </div>
      
      <div>
        <label htmlFor="descriptionInput">Description: </label>
        <input 
          id="descriptionInput" 
          type="text" 
          onChange={this.handleDescriptionChange}
          value={
            this.state.product 
              ? this.state.product.description
              : ''
          } />
      </div>

      <div>
        <input type="button" value="Update" onClick={this.handleUpdateClick} />
        <input type="button" value="Delete" onClick={this.handleDeleteClick} />
      </div>
    </div>;

}
