import { Component } from 'react';
import AppRouter from '../AppRouter';
import ProductRepository from '../data/ProductRepository';
import { Routes } from '../Config';
import { Form, Button, Container, Header } from 'semantic-ui-react';
import ErrorMessage from './ErrorMessage';

export default class CreateItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    }
  }

  getProductRequest() {
    var request = {
      name: document.getElementById('nameInput').value,
      type: 'good'
    };
    
    var description = document.getElementById('descriptionInput').value;
    if (description)
      request.description = description;
    
    return request
  };

  showErrorMessage = () =>
    this.setState({ message: 'Please enter a product name.' });

  createProductClicked = () => 
  document.getElementById('nameInput').value.length === 0
    ? this.showErrorMessage()
    : ProductRepository
      .create(this.getProductRequest())
      .then(product =>{
        if (product.error)
          console.log(product);
        else
          AppRouter.navigate(Routes.updateProduct + '?productId=' + product.id)
      });

  render = () =>
    <Container>
      <Header as='h1' textAlign='center'>Create Product</Header>
      <ErrorMessage message={this.state.message}/>
      <Form>
        <Form.Field>
          <label>Name: </label>
          <input 
            id="nameInput" 
            placeholder="Product Name"
            type="text" 
            maxLength="250" />
        </Form.Field>
        
        <Form.Field>
          <label>Description: </label>
          <input 
            id="descriptionInput" 
            placeholder="Product Description"
            type="text" 
            maxLength="250" />
        </Form.Field>

        <Button.Group fluid widths="2">
          <Button onClick={() => AppRouter.navigate(Routes.itemManagement)}>Cancel</Button>
          <Button positive onClick={this.createProductClicked}>Save</Button>
        </Button.Group>
    </Form>
  </Container>;
}
