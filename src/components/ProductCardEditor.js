import { Component } from "react";
import PriceRepository from "../services/priceRepository";
import ProductRepository from "../services/productRepository";
import { Card, Form, Button } from 'semantic-ui-react';
import ErrorMessage from './ErrorMessage';

export default class ProductCardEditor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      product: props.product,
      price: props.price,
      newProduct: {
        name: props.product.name,
        description: props.product.description
      },
      newPrice: props.price 
        ? (props.price.unit_amount / 100).toFixed(2)
        : (0).toFixed(),
      onSave: props.onSave,
      onCancel: props.onCancel,
      message: ''
    };
  }

  onNameChange = event => {
    var newProduct = this.state.newProduct;
    newProduct.name = event.target.value;
    this.setState({ newProduct });
  }

  onDescriptionChange = event => {
    var newProduct = this.state.newProduct;
    newProduct.description = event.target.value;
    this.setState({ newProduct });
  }

  onPriceChange = event => {
    var newPrice = this.state.newProduct;
    newPrice = event.target.value;
    this.setState({ newPrice });
  }

  getPriceAmount() {
    var input = this.state.newPrice.trim();
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

  updateProduct = async () => {
    if (this.state.product.name === this.state.newProduct.name &&
      this.state.product.description === this.state.newProduct.description)
      return;

    await ProductRepository.update(
      this.state.product.id, {
        name: this.state.newProduct.name,
        description: this.state.newProduct.description
      })
      .then(product => this.setState({ product }));
  }

  updatePrice = async () => {
    var newPrice = this.getPriceAmount() * 100;
    if (newPrice === this.state.price.unit_amount)
      return;
    
    await PriceRepository
      .createUnitPrice(this.state.product.id, newPrice)
      .then(price => {
        PriceRepository.deactivate(this.state.price.id);
        this.setState({ price });
      });
  }

  onSaveClicked = async () => {
    if (!this.priceIsValid()) {
      this.setState({message: 'Please enter a valid price.'});
      return;
    }

    await this.updateProduct();
    await this.updatePrice();

    this.state.onSave &&
    this.state.onSave(this.state.product, this.state.price);
  }

  onCancelClicked = () => 
    this.state.onCancel &&
    this.state.onCancel();

  render = () =>
    <Card.Content>
      <ErrorMessage message={this.state.message} />
      <Form>
        <Form.Field>
          <label>Name:</label>
          <input 
            id="nameInput"
            type="text" 
            defaultValue={this.state.product.name} 
            onChange={this.onNameChange} />
        </Form.Field>

        <Form.Field>
          <label>Description:</label>
          <input 
            id="descriptionInput"
            type="text" 
            defaultValue={this.state.product.description} 
            onChange={this.onDescriptionChange} />
        </Form.Field>

        <Form.Field>
          <label>Price:</label>
          <input 
            id="priceInput"
            type="text" 
            defaultValue={this.state.newPrice}
            onChange={this.onPriceChange} />
        </Form.Field>
        <Form.Field>
          <Button.Group fluid>
            <Button 
              content='Cancel'
              onClick={this.onCancelClicked}
            />
            <Button 
              color='green'
              content='Save'
              onClick={this.onSaveClicked}
              />
          </Button.Group>
        </Form.Field>
      </Form>
    </Card.Content>;
}