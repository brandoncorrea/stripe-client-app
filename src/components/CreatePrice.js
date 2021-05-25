import { Component } from "react";
import { Container, Header, Form, Button } from "semantic-ui-react";
import AppRouter from "../AppRouter";
import { Routes } from "../Config";
import PriceRepository from "../services/priceRepository";
import ErrorMessage from './ErrorMessage';


export default class CreatePrice extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: '',
      productId: AppRouter.getSearchParam('productId')
    };

    this.createPriceClicked = this.createPriceClicked.bind(this);
  }

  createPriceClicked() {
    var request = {
      currency: 'usd',
      product: this.state.productId,
      unit_amount: this.getUnitAmount(),
      active: document.getElementById('activeCheckbox').checked,
      nickname: document.getElementById('nicknameInput').value
    }

    if (isNaN(request.unit_amount))
      return;
    
    PriceRepository
      .create(request)
      .then(() => AppRouter.navigate(Routes.priceManagement + '?productId=' + this.state.productId));
  }
    
  getUnitAmount() {
    var value = document.getElementById('unitAmountInput').value;
    if (value.length === 0) {
      this.setState({ message: 'Please enter a valid price.' });
      return;
    }

    if (value[0] === '$')
      value = value.substring(1);
    if (value[0] === '.')
      value = '0' + value;

    var parts = value.split('.');
    console.log('value', value);
    console.log('parts', parts);
    if (parts.length > 2 || (parts.length === 2 && parts[1].length > 2)) {
      this.setState({ message: 'Please enter a valid price.' });
      return;
    }
    
    var price = parseFloat(value) * 100;
    if (price > 99999999)
      this.setState({ message: 'Price must be less than or equal to $999,999.99.' });

    return price;
  }

  render = () =>
  <Container>
    <Header as='h1' textAlign='center'>Create Price</Header>
    <ErrorMessage message={this.state.message}/>
    <Form>
      <Form.Field>
        <label>Nickname: </label>
        <input 
          id="nicknameInput" 
          placeholder="Nickname"
          type="text" 
          maxLength="250" />
      </Form.Field>
      
      <Form.Field>
        <label>Amount: </label>
        <input 
          id="unitAmountInput" 
          placeholder="3.99"
          type="text" 
          maxLength="250" />
      </Form.Field>
      
      <Form.Field>
        <Form.Checkbox
          toggle
          label="Active"
          id="activeCheckbox"
          defaultChecked={true}
          />
      </Form.Field>
      <Button.Group fluid>
        <Button onClick={() => AppRouter.navigate(Routes.priceManagement + '?productId=' + this.state.productId)}>Cancel</Button>
        <Button positive onClick={this.createPriceClicked}>Save</Button>
      </Button.Group>
  </Form>
</Container>;
}