import { Component } from "react";
import { Container, Header, Form, Button } from 'semantic-ui-react';
import ErrorMessage from './ErrorMessage';
import AppRouter from '../AppRouter';
import { Routes } from "../Config";
import ProductRepository from "../data/ProductRepository";
import PriceList from "./PriceList";

export default class UpdateProduct extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      showPrices: false,
      product: {
        name: '',
        description: '',
        statement_descriptor: '',
        unit_label: '',
        active: false,
        metadata: {
          web: "false",
          cafe: "false",
          resource: "false"
        }
      }
    };

    ProductRepository
      .getById(AppRouter.getSearchParam('productId'))
      .then(product => {
        if (product.error)
          AppRouter.navigate(Routes.itemManagement);
        else
          this.setState({ product })
      });

    this.onNameChange = this.onNameChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onStatementDescriptorChange = this.onStatementDescriptorChange.bind(this);
    this.onUnitLabelChange = this.onUnitLabelChange.bind(this);
    this.onWebChange = this.onWebChange.bind(this);
    this.onCafeChange = this.onCafeChange.bind(this);
    this.onResourceChange = this.onResourceChange.bind(this);
    this.onActiveChange = this.onActiveChange.bind(this);
    this.onPricesClicked = this.onPricesClicked.bind(this);
  }

  getRequest = () => ({
    name: this.state.product.name,
    description: this.state.product.description,
    statement_descriptor: this.state.product.statement_descriptor,
    unit_label: this.state.product.unit_label,
    active: this.state.product.active,
    metadata: {
      web: this.state.product.metadata.web 
        ? this.state.product.metadata.web 
        : "false",
      resource: this.state.product.metadata.resource 
        ? this.state.product.metadata.resource 
        : "false",
      cafe: this.state.product.metadata.cafe 
        ? this.state.product.metadata.cafe
        : "false"
    }
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

  onStatementDescriptorChange(event) {
    var product = this.state.product;
    product.statement_descriptor = event.target.value;
    this.setState({ product });
  }

  onUnitLabelChange(event) {
    var product = this.state.product;
    product.unit_label = event.target.value;
    this.setState({ product });
  }

  onWebChange(event) {
    var product = this.state.product;
    product.metadata.web = event.target.checked.toString();
    this.setState({ product });
  }

  onCafeChange(event) {
    var product = this.state.product;
    product.metadata.cafe = event.target.checked.toString();
    this.setState({ product });
  }

  onResourceChange(event) {
    var product = this.state.product;
    product.metadata.resource = event.target.checked.toString();
    this.setState({ product });
  }

  onActiveChange(event) {
    var product = this.state.product;
    product.active = event.target.checked;
    this.setState({ product });
  }

  onPricesClicked(event) {
    this.setState({ showPrices: true });
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
          <label>Statement Descriptor: </label>
          <input 
            id="statementDescriptorInput" 
            placeholder="Statement Descriptor"
            value={this.state.product.statement_descriptor 
              ? this.state.product.statement_descriptor 
              : ''}
            onChange={this.onStatementDescriptorChange}
            type="text" />
        </Form.Field>
        
        <Form.Field>
          <label>Unit Label: </label>
          <input 
            id="unitLabelInput" 
            placeholder="Unit Label"
            value={this.state.product.unit_label 
              ? this.state.product.unit_label 
              : ''}
            onChange={this.onUnitLabelChange}
            maxLength="12"
            type="text"  />
        </Form.Field>

        <Form.Group inline>
          <label>Available At: </label>
          <Form.Checkbox 
            label="Online Shop"
            id="webCheckbox"
            checked={
              this.state.product.metadata.web 
              ? this.state.product.metadata.web.toString().toLowerCase() === 'true'
              : false}
            onChange={this.onWebChange}
            />
          <Form.Checkbox 
            label="Caf&eacute;"
            id="cafeCheckbox"
            checked={this.state.product.metadata.cafe
              ? this.state.product.metadata.cafe.toString().toLowerCase() === 'true'
              : false}
            onChange={this.onCafeChange}
            />
          <Form.Checkbox 
            label="Resource Center"
            id="resourceCheckbox"
            checked={this.state.product.metadata.resource
              ? this.state.product.metadata.resource.toString().toLowerCase() === 'true'
              : false}
            onChange={this.onResourceChange}
            />
        </Form.Group>
        <Form.Field>
          <Form.Checkbox
            toggle
            label="Active"
            id="activeCheckbox"
            checked={this.state.product.active}
            onChange={this.onActiveChange}
            />
        </Form.Field>

        <Form.Field>
          {
            this.state.showPrices 
            ? <PriceList productId={this.state.product.id}/>
            : <Button fluid onClick={this.onPricesClicked}>Prices</Button>
          }
        </Form.Field>

        <Button.Group fluid widths="3">
          <Button
            negative 
            onClick={() => AppRouter.navigate(Routes.itemManagement)}>Cancel</Button>
          <Button 
            onClick={() => AppRouter.navigate(Routes.createPrice + '?productId=' + this.state.product.id)}
            content='Create Price' />
          <Button positive onClick={this.updateProductClicked}>Save</Button>
        </Button.Group>
      </Form>
    </Container>;
}