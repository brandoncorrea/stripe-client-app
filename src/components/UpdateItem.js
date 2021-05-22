import { Component } from 'react';
import ProductRepository from '../services/productRepository';
import AppRouter from '../AppRouter';
import { Routes } from '../Config';
import { Form, Container, Button, Header, Message, Checkbox } from 'semantic-ui-react';

export default class UpdateItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      product: {
        description: '',
        name: '',
        active: false
      },
      message: ''
    };

    var productId = new URLSearchParams(window.location.search).get('id');
    if (productId === null)
      AppRouter.navigate(Routes.itemManagement);

    ProductRepository
      .get(productId)
      .then(product => {
        if (product.error)
          AppRouter.navigate(Routes.itemManagement);
        else
          this.setState({ product, message: '' });
      });
      
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleUpdateClick = this.handleUpdateClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  handleUpdateClick = () => {
    var request = {
      name: this.state.product.name,
      description: this.state.product.description,
      active: this.state.product.active
    }

    ProductRepository
      .update(this.state.product.id, request)
      .then(() => AppRouter.navigate(Routes.itemManagement));
  }

  handleDeleteClick = () =>
    ProductRepository
      .delete(this.state.product.id)
      .then(res => {
        if (res.deleted)
          AppRouter.navigate(Routes.itemManagement);
        else 
          this.setState({
            message:res.error.message, 
            product: this.state.product 
          });
      })
      .catch(err => console.error('err:', err));

  handleNameChange = event => {
    var product = this.state.product;
    product.name = event.target.value;
    this.setState({ product });
  }

  handleDescriptionChange = event => {
    var product = this.state.product;
    product.description = event.target.value;
    this.setState({ product })
  }

  handleActiveToggle = event => {
    var product = this.state.product;
    product.active = event.target.checked;
    this.setState({ product });
  }

  render = () =>
    <Container>
      <Header as='h1' textAlign='center'>Update Item</Header>
      {
        this.state.message.length > 0 &&
        <Message negative>
          <Message.Header>Sorry, we can't delete that item</Message.Header>
          <p>{this.state.message}</p>
        </Message>
      }
      <Form>
          <Form.Field>
            <label>Name: </label>
            <input 
              id="nameInput" 
              type="text" 
              onChange={this.handleNameChange}
              value={this.state.product.name} 
              />
          </Form.Field>
          
          <Form.Field>
            <label>Description: </label>
            <input 
              id="descriptionInput" 
              type="text" 
              onChange={this.handleDescriptionChange}
              value={this.state.product.description} 
              />
          </Form.Field>

          <Form.Field>
            <Checkbox 
              toggle 
              label="Active"
              id="activeCheckbox"
              checked={this.state.product.active}
              onChange={this.handleActiveToggle} />
          </Form.Field>

          <Button.Group fluid>
            <Button negative onClick={this.handleDeleteClick}>Delete</Button>
            <Button onClick={() => AppRouter.navigate(Routes.itemManagement)}>Cancel</Button>
            <Button positive onClick={this.handleUpdateClick}>Save</Button>
          </Button.Group>
      </Form>
    </Container>;
}
