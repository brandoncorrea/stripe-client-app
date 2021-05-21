import { Component } from 'react';
import ProductRepository from '../../services/productRepository';
import UpdateProductRequest from '../../models/updateProductRequest';
import Product from '../../models/product';
import { navigate } from '../../AppRouter';
import { Routes } from '../../Config';
import { Form, Container, Button, Header } from 'semantic-ui-react';

export default class EditItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      product: new Product()
    };

    var productId = new URLSearchParams(window.location.search).get('id');
    if (productId == null)
      navigate(Routes.itemManagement);

    ProductRepository
      .get(productId)
      .then(product => {
        if (product.error)
          navigate(Routes.itemManagement);
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
    request.name = document.getElementById('nameInput').value;
    request.description = document.getElementById('descriptionInput').value;

    ProductRepository
      .update(this.state.product.id, request)
      .then(() => navigate(Routes.itemManagement));
  }

  handleDeleteClick = () =>
    ProductRepository
      .delete(this.state.product.id)
      .then(success =>{
        if (success)
          navigate(Routes.itemManagement);
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
    <Container>
      <Header as='h1' textAlign='center'>Update Item</Header>
      <Form>
          <Form.Field>
            <label>Name: </label>
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
          </Form.Field>
          
          <Form.Field>
            <label>Description: </label>
            <input 
              id="descriptionInput" 
              type="text" 
              onChange={this.handleDescriptionChange}
              value={
                this.state.product 
                  ? this.state.product.description
                  : ''
              } />
          </Form.Field>

          <Button.Group fluid>
            <Button negative onClick={this.handleDeleteClick}>Delete</Button>
            <Button onClick={() => navigate(Routes.itemManagement)}>Cancel</Button>
            <Button positive onClick={this.handleUpdateClick}>Save</Button>
          </Button.Group>
      </Form>
    </Container>;

}
