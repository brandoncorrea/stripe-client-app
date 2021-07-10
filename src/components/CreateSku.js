import { Component } from "react";
import { Container, Header, Form, Button, Input } from "semantic-ui-react";
import AppRouter from "../AppRouter";
import { Routes } from "../Config";
import SkuRepository from "../data/SkuRepository";
import ErrorMessage from './ErrorMessage';

export default class CreateSku extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      productId: AppRouter.getSearchParam('productId'),
      price: '',
      amountError: null
    };

    this.amountOnChange = this.amountOnChange.bind(this);
    this.activeOnChange = this.activeOnChange.bind(this);
    this.createSkuClicked = this.createSkuClicked.bind(this);
    this.getUnitAmount = this.getUnitAmount.bind(this);
    this.getAmountError = this.getAmountError.bind(this);
    this.amountOnChange = this.amountOnChange.bind(this);
  }

  errorMessage = message => ({
    content: message,
    pointing: 'above'
  });

  getAmountError() {
    var amount = this.state.price;
    // Amount should have a value
    if (amount.length === 0)
      return this.errorMessage('Please enter a valid price.');

    // Format amount
    if (amount[0] === '$')
      amount = amount.substring(1);
    if (amount[0] === '.')
      amount = '0' + amount;

    // Validate decimal places
    var parts = amount.split('.');
    if (parts.length > 2 || (parts.length === 2 && parts[1].length > 2)) 
      return this.errorMessage('Please enter a valid price.');

    var num = Number(amount);
    if (isNaN(num))
      return this.errorMessage('Please enter a valid price.');
    if (num > 999999.99)
      return this.errorMessage('Price must be less than or equal to $999,999.99.');

    return false;
  }

  getUnitAmount = () => 
    this.state.price[0] === '$' 
    ? Number(this.state.price.substring(1)) * 100
    : Number(this.state.price) * 100;

  createSkuClicked() {
    var amountError = this.getAmountError();
    if (amountError)
      this.setState({ amountError });
    else
      this.createSku();
  }

  createSku = () =>
    new SkuRepository()
      .create(this.state.productId, this.getUnitAmount())
      .then(res => {
        if (res.error)
          this.setState({ message: res.error.message });
        else
          this.navigateToUpdateProduct();
      });

  navigateToUpdateProduct = () =>
    AppRouter.navigate(`${Routes.updateProduct}?productId=${this.state.productId}`);

  amountOnChange = (event, data) =>
    this.setState({ price: data.value });

  activeOnChange = (event, data) =>
    this.setState({ active: data.checked });
  
  render = () =>
    <Container>
      <Header as='h1' textAlign='center'>Create Sku</Header>
      <ErrorMessage message={this.state.message}/>
      <Form>
        <Form.Group widths="equal">
          <Form.Field
            id="unitAmountInput"
            label="Amount:"
            control={Input}
            placeholder="3.99"
            maxLength="250"
            value={this.state.price}
            onChange={this.amountOnChange}
            error={this.state.amountError}
            />
        </Form.Group>

        <Button.Group fluid>
          <Button 
            content="Cancel"
            onClick={this.navigateToUpdateProduct} />
          <Button positive 
            content="Save"
            onClick={this.createSkuClicked} />
        </Button.Group>
      </Form>
    </Container>;
}