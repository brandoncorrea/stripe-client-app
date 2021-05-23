import { Component } from "react";
import { Container, Header, Form, Button, Checkbox, Select } from "semantic-ui-react";
import AppRouter from "../AppRouter";
import { Routes } from "../Config";
import ProductRepository from "../services/productRepository";

export default class CreatePrice extends Component {

  billingSchemes = [
    { key: 'per_unit', text: 'Per Unit', value: 'per_unit' },
    { key: 'tiered', text: 'Tiered', value: 'tiered' },
  ];

  priceTypes = [
    { key: 'one_time', text: 'One Time', value: 'one_time' },
    { key: 'recurring', text: 'Recurring', value: 'recurring' },
  ];

  constructor(props) {
    super(props);
    this.state = {
      product: {
        id: '',
        name: ''        
      }
    };

    this.state.product.id = AppRouter.getSearchParam('productId');
    if (this.state.product.id === null)
      AppRouter.navigate(Routes.itemManagement);

    ProductRepository
      .get(this.state.product.id)
      .then(product => this.setState({ product }));
  }

  navigateToPriceManagement = () =>
    AppRouter.navigate(`${Routes.priceManagement}?productId=${this.state.productId}`);

  createPriceClicked = () => {

  }

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
            options={this.billingSchemes}
            defaultValue={this.billingSchemes[0].value}
            />
        </Form.Field>

        <Form.Field>
          <label>Price Types</label>
          <Select 
            options={this.priceTypes}
            defaultValue={this.priceTypes[0].value}
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