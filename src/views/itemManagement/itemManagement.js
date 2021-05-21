import { Component } from 'react';
import { Button, Form, Container, Header } from 'semantic-ui-react';
import ProductList from './productList/productList';
import { navigate } from '../../AppRouter';
import { Routes } from '../../Config';

export default class ItemManagement extends Component {  

  render = () =>
    <Container>
      <Header as='h1' textAlign='center'>Item Management</Header>
      <Form>
        <Form.Field>
          <ProductList />
        </Form.Field>
        <Form.Field>
          <Button.Group fluid>
            <Button 
              negative
              onClick={() => navigate(Routes.home)} 
              content='Exit' />
            <Button 
              positive
              onClick={() => navigate(Routes.createItem)}
              content='Create Item' />
          </Button.Group>
        </Form.Field>
      </Form>
    </Container>
}
