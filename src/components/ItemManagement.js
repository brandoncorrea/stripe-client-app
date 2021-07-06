import { Component } from 'react';
import { Button, Container, Form, Header } from 'semantic-ui-react';
import ProductList from './ProductList';
import AppRouter from '../AppRouter';
import { Routes } from '../Config';

export default class ItemManagement extends Component {  

  render = () =>
    <Container>
      <Header as='h1' textAlign='center'>Item Management</Header>
      <Form>
        <ProductList />
        <Button fluid
          positive
          onClick={() => AppRouter.navigate(Routes.createItem)}
          content='Create Item' />
      </Form>
    </Container>
}
