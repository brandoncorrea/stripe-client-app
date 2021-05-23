import { Component } from 'react';
import AppRouter from '../AppRouter';
import ProductRepository from '../services/productRepository';
import PriceRepository from '../services/priceRepository';
import { Routes } from '../Config';
import { Form, Button, Container, Header, Checkbox } from 'semantic-ui-react';
import ErrorMessage from './ErrorMessage';

export default class CreateItem extends Component {

  state = {
    message: ''
  }

  createProductClicked = () => {
    if (!this.priceIsValid()) {
      this.setState({message: 'Please enter a valid price.'});
      return;
    }
    
    ProductRepository
      .create({
        name: document.getElementById('nameInput').value,
        description: document.getElementById('descriptionInput').value,
        active: document.getElementById('activeCheckbox').checked    
      })
      .then(product => {
        if (product.id)
          PriceRepository
            .createUnitPrice(product.id, this.getPriceAmount() * 100)
            .then(() => AppRouter.navigate(Routes.itemManagement));
      });
  }

  getPriceAmount() {
    var input = document.getElementById('priceInput').value.trim();
    if (input.length === 0)
      return undefined;
    if (input[0] === '$')
      input = input.substring(1);
    return parseFloat(input);
  }

  hasLessThanTwoDecimals = value => {
    value = value.toString().split('.');
    return value.length < 2 ||
      (value.length === 2 && value[1].length <= 2);
  }

  priceIsValid = () => {
    var price = this.getPriceAmount();
    return !isNaN(price) 
      && this.hasLessThanTwoDecimals(price);
  };

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
            type="text" />
        </Form.Field>
        
        <Form.Field>
          <label>Description: </label>
          <input 
            id="descriptionInput" 
            placeholder="Product Description"
            type="text"  />
        </Form.Field>

        <Form.Field>
          <label>Price: </label>
          <input 
            type="text" 
            id="priceInput" 
            placeholder="1.99" />
        </Form.Field>

        <Form.Field>
          <Checkbox 
            toggle 
            label="Active"
            id="activeCheckbox"
            defaultChecked={true}
            />
        </Form.Field>

        <Button.Group fluid>
          <Button onClick={() => AppRouter.navigate(Routes.itemManagement)}>Cancel</Button>
          <Button positive onClick={this.createProductClicked}>Save</Button>
        </Button.Group>
    </Form>
  </Container>;
}
