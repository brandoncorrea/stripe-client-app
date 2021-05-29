import { Component } from 'react';
import AppRouter from '../AppRouter';
import ProductRepository from '../services/productRepository';
import { Routes } from '../Config';
import { Form, Button, Container, Header } from 'semantic-ui-react';
import ErrorMessage from './ErrorMessage';

export default class CreateItem extends Component {

  state = {
    message: ''
  }

  getProductRequest = () => ({
    name: document.getElementById('nameInput').value,
    description: document.getElementById('descriptionInput').value,
    active: document.getElementById('activeCheckbox').checked,
    metadata: {
      "cafe": document.getElementById('cafeCheckbox').checked,
      "web": document.getElementById('webCheckbox').checked,
      "resource": document.getElementById('resourceCheckbox').checked,
    },
    unit_label: document.getElementById('unitLabelInput').value,
    statement_descriptor: document.getElementById('statementDescriptorInput').value
  });

  showErrorMessage = () =>
    this.setState({ message: 'Please enter a product name.' });

  createProductClicked = () => 
  document.getElementById('nameInput').value.length === 0
    ? this.showErrorMessage()
    : ProductRepository
      .create(this.getProductRequest())
      .then(product =>
        AppRouter.navigate(Routes.updateProduct + '?productId=' + product.id));

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
        
        <Form.Field>
          <label>Statement Descriptor: </label>
          <input 
            id="statementDescriptorInput" 
            placeholder="Statement Descriptor"
            type="text" />
        </Form.Field>
        
        <Form.Field>
          <label>Unit Label: </label>
          <input 
            id="unitLabelInput" 
            placeholder="Unit Label"
            type="text"  />
        </Form.Field>

        <Form.Group inline>
          <label>Available At: </label>
          <Form.Checkbox 
            label="Online Shop"
            id="webCheckbox"
            />
          <Form.Checkbox 
            label="Caf&eacute;"
            id="cafeCheckbox"
            />
          <Form.Checkbox 
            label="Resource Center"
            id="resourceCheckbox"
            />
        </Form.Group>
        <Form.Field>
          <Form.Checkbox
            toggle
            label="Active"
            id="activeCheckbox"
            defaultChecked={true}
            />
        </Form.Field>
        <Button.Group fluid widths="2">
          <Button onClick={() => AppRouter.navigate(Routes.itemManagement)}>Cancel</Button>
          <Button positive onClick={this.createProductClicked}>Save</Button>
        </Button.Group>
    </Form>
  </Container>;
}
