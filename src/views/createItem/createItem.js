import { Component } from 'react';
import AppRouter from '../../AppRouter';
import ProductRepository from '../../services/productRepository';
import { Routes } from '../../Config';
import CreateProductRequest from '../../models/createProductRequest';
import { Form, Button, Container, Header } from 'semantic-ui-react';

export default class CreateItem extends Component {

  createProductClicked() {
    var request = new CreateProductRequest();
    request.name = document.getElementById('nameInput').value;
    request.description = document.getElementById('descriptionInput').value;
    
    ProductRepository
      .create(request)
      .then(i => AppRouter.navigate(Routes.itemManagement));
  }

  render = () =>
  <Container>
    <Header as='h1' textAlign='center'>Create Product</Header>
    <Form>
        <Form.Field>
          <label>Name: </label>
          <input 
            id="nameInput" 
            placeholder="Product Name"
            type="text" />
        </Form.Field>
        
        <Form.Field>
          <label>Description: </label>
          <input 
            id="descriptionInput" 
            placeholder="Product Description"
            type="text"  />
        </Form.Field>

        <Button.Group fluid>
          <Button onClick={() => AppRouter.navigate(Routes.itemManagement)}>Cancel</Button>
          <Button positive onClick={this.createProductClicked}>Save</Button>
        </Button.Group>
    </Form>
  </Container>;

}
