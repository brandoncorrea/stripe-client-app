import { Component } from 'react';
import { Button, Container, Header } from 'semantic-ui-react';
import ProductList from './ProductList';
import AppRouter from '../AppRouter';
import { Routes } from '../Config';

export default class ItemManagement extends Component {  

  render = () =>
    <Container>
      <Header as='h1' textAlign='center'>Item Management</Header>
      <ProductList />
      <Button.Group fluid>
        <Button 
          negative
          onClick={() => AppRouter.navigate(Routes.home)} 
          content='Exit' />
        <Button 
          positive
          onClick={() => AppRouter.navigate(Routes.createItem)}
          content='Create Item' />
      </Button.Group>
    </Container>
}
