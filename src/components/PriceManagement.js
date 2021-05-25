import { Component } from "react";
import AppRouter from "../AppRouter";
import { Routes } from "../Config";
import { Container, Header, Button } from 'semantic-ui-react';
import PriceList from './PriceList';

export default class PriceManagement extends Component {

  constructor(props) {
    super(props);
    this.state = {
      productId: AppRouter.getSearchParam('productId')
    }
  }

  render = () =>
    <Container>
      <Header as='h1' textAlign='center'>Price Management</Header>
      <PriceList productId={this.state.productId} />
      <Button.Group fluid>
        <Button 
          negative
          onClick={() => AppRouter.navigate(Routes.updateProduct + '?productId=' + this.state.productId)} 
          content='Exit' />
        <Button 
          positive
          onClick={() => AppRouter.navigate(Routes.createPrice + '?productId=' + this.state.productId)}
          content='Create Price' />
      </Button.Group>
    </Container>;
}