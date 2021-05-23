import { Component } from "react";
import { Container, Header, Form, Button, Checkbox, Select, Message } from "semantic-ui-react";
import AppRouter from "../AppRouter";
import { Routes } from "../Config";
import PriceRepository from "../services/priceRepository";
import ProductRepository from "../services/productRepository";

export default class CreatePrice extends Component {

  billingSchemes = [
    { key: 'per_unit', text: 'Per Unit', value: 'per_unit' },
    //{ key: 'tiered', text: 'Tiered', value: 'tiered' },
  ];

  constructor(props) {
    super(props);
    this.state = {
      product: {
        id: '',
        name: ''        
      },
      billingScheme: this.billingSchemes[0].value,
      message: ''
    };

    this.state.product.id = AppRouter.getSearchParam('productId');
    if (this.state.product.id === null)
      AppRouter.navigate(Routes.itemManagement);

    ProductRepository
      .get(this.state.product.id)
      .then(product => this.setState({ product }));
  }

  navigateToPriceManagement = () =>
    AppRouter.navigate(`${Routes.priceManagement}?productId=${this.state.product.id}`);

  getPriceAmount() {
    var input = document.getElementById('amountInput').value.trim();
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

  createPriceClicked = () => {
    if (!this.priceIsValid()) {
      this.setState({message: 'Please enter a valid price.'});
      return;
    }

    var request = {
      product: this.state.product.id,
      currency: 'usd',
      unit_amount: this.getPriceAmount() * 100,
      billing_scheme: this.state.billingScheme,
      active: document.getElementById('activeCheckbox').checked
    };

    PriceRepository
      .create(request)
      .then(() => this.navigateToPriceManagement());
  }
  
  setBillingScheme = (e, { value }) =>
    this.setState({billingScheme: value});

  render = () =>
    <Container>
      <Header 
        as='h1' 
        content='Create Price' 
        textAlign='center' />
      
      <Header 
        as='h3'
        content={this.state.product.name}
        textAlign='center'/>

      {
        this.state.message.length > 0 &&
        <Message negative>
          <p>{this.state.message}</p>
        </Message>
      }

      <Form>
        <Form.Field>
          <label>Dollar Amount</label>
          <input 
            type="text" 
            id="amountInput" 
            placeholder="1.99" />
        </Form.Field>

        <Form.Field>
          <label>Billing Scheme</label>
          <Select 
            id="billingSchemeInput"
            options={this.billingSchemes}
            defaultValue={this.billingSchemes[0].value}
            onChange={this.setBillingScheme}
            />
        </Form.Field>

        <Form.Field>
          <Checkbox 
            toggle 
            label="Active"
            id="activeCheckbox"
            defaultChecked={true}
            />
        </Form.Field>

        <Form.Field>
          <Button.Group fluid>
            <Button onClick={this.navigateToPriceManagement}>Cancel</Button>
            <Button positive onClick={this.createPriceClicked}>Save</Button>
          </Button.Group>
        </Form.Field>
      </Form>
    </Container> 

}