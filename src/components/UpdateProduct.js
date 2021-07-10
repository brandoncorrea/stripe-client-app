import { Component } from "react";
import { Container, Header, Form, Button } from 'semantic-ui-react';
import ErrorMessage from './ErrorMessage';
import AppRouter from '../AppRouter';
import { EventNames, Routes } from "../Config";
import ProductRepository from "../data/ProductRepository";
import SkuList from "./SkuList";
import EventEmitter from "../helpers/eventEmitter";

export default class UpdateProduct extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      showSkus: false,
      product: {
        id: AppRouter.getSearchParam('productId'),
        name: '',
        description: '',
        statement_descriptor: '',
        unit_label: '',
      }
    };

    ProductRepository
      .getById(this.state.product.id)
      .then(product => {
        if (product.error)
          AppRouter.navigate(Routes.itemManagement);
        else
          this.setState({ product })
      });
    
    // Configure events
    EventEmitter.subscribe(
      EventNames.skuDeletedError,
      event => {
        if (this.state.product.id === event.product)
          this.setState({ message: event.error.message });
      });
    
    EventEmitter.subscribe(
      EventNames.skuDeleted,
      event => {
        if (this.state.product.id === event.product)
          this.setState({ message: '' });
      });

    this.onNameChange = this.onNameChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onSkusClicked = this.onSkusClicked.bind(this);
  }

  getRequest = () => ({
    name: this.state.product.name,
    description: this.state.product.description,
    shippable: false,
  });

  updateProductClicked = () =>
    ProductRepository
      .update(this.state.product.id, this.getRequest())
      .then(res => {
        if (res.error)
          this.setState({ message: res.error.message });
        else
          AppRouter.navigate(Routes.itemManagement)
      });

  onNameChange(event) {
    var product = this.state.product;
    product.name = event.target.value;
    this.setState({ product });
  }

  onDescriptionChange(event) {
    var product = this.state.product;
    product.description = event.target.value;
    this.setState({ product });
  }

  onSkusClicked(event) {
    this.setState({ showSkus: true });
  }

  render = () =>
    <Container>
      <Header as='h1' textAlign='center'>Update Product</Header>
      <ErrorMessage message={this.state.message}/>
      <Form>
        <Form.Field>
          <label>Name: </label>
          <input 
            id="nameInput" 
            placeholder="Product Name"
            type="text" 
            value={this.state.product.name}
            onChange={this.onNameChange}
            maxLength="250" />
        </Form.Field>
        
        <Form.Field>
          <label>Description: </label>
          <input 
            id="descriptionInput" 
            placeholder="Product Description"
            type="text" 
            value={this.state.product.description 
              ? this.state.product.description
              : ''}
            onChange={this.onDescriptionChange}
            maxLength="250" />
        </Form.Field>

        <Form.Field>
          {
            this.state.showSkus 
            ? <SkuList productId={this.state.product.id}/>
            : <Button fluid onClick={this.onSkusClicked}>Skus</Button>
          }
        </Form.Field>

        <Button.Group fluid widths="3">
          <Button
            negative 
            onClick={() => AppRouter.navigate(Routes.itemManagement)}>Cancel</Button>
          <Button 
            onClick={() => AppRouter.navigate(Routes.createSku + '?productId=' + this.state.product.id)}
            content='Create Sku' />
          <Button positive onClick={this.updateProductClicked}>Save</Button>
        </Button.Group>
      </Form>
    </Container>;
}