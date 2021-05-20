import { Component } from 'react';
import AppRouter from '../../AppRouter';
import ProductRepository from '../../services/productRepository';
import './createItem.css';
import { Routes } from '../../Config';
import CreateProductRequest from '../../models/createProductRequest';

export default class CreateItem extends Component {

  createItemClicked() {
    var request = new CreateProductRequest();
    request.name = document.getElementById('nameInput').value;
    request.description = document.getElementById('descriptionInput').value;
    
    ProductRepository
      .create(request)
      .then(i => AppRouter.navigate(Routes.itemManagement));
  }

  render = () =>
    <div className="CreateItem">
      <div>
        <label htmlFor="nameInput">Name: </label>
        <input id="nameInput" type="text" />
      </div>
      
      <div>
        <label htmlFor="descriptionInput">Description: </label>
        <input id="descriptionInput" type="text" />
      </div>

      <div>
        <input type="button" value="Create" onClick={this.createItemClicked} />
      </div>
    </div>;

}
