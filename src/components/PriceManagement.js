import { Component } from "react";
import { Button, Container, Header } from 'semantic-ui-react';
import AppRouter from "../AppRouter";
import { Routes } from "../Config";
import PriceList from './PriceList';

export default class PriceManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: '',
    }

    this.state.productId = AppRouter.getSearchParam('productId');
  }

  navigateToManageProduct = () => 
    AppRouter.navigate(`${Routes.editItem}?productId=${this.state.productId}`);

  navigateToCreatePrice = () =>
    {}//AppRouter.navigate(`${Routes.createPrice}?productId=${this.state.productId}`);

  render = () =>
    <Container>
      <Header 
        as='h1' 
        textAlign='center'
        content='Price Management' />
      <PriceList 
        productId={this.state.productId} />
      <Button.Group fluid>
        <Button 
          content='Back'
          onClick={this.navigateToManageProduct}
          />
        <Button 
          positive
          content='Create Price' 
          onClick={this.navigateToCreatePrice}/>
      </Button.Group>
    </Container>
}