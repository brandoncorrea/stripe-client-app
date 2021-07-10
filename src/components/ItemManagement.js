import { Component } from 'react';
import { Button, Container, Form, Header } from 'semantic-ui-react';
import ProductList from './ProductList';
import AppRouter from '../AppRouter';
import { EventNames, Routes } from '../Config';
import ErrorMessage from './ErrorMessage';
import EventEmitter from '../helpers/eventEmitter';

export default class ItemManagement extends Component {  
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: ''
    };

    EventEmitter.subscribe(
      EventNames.productDeletedError,
      event => this.setState({ errorMessage: event.error.message }));

    EventEmitter.subscribe(
      EventNames.productDeleted,
      () => this.setState({ errorMessage: '' }));
  }

  render = () =>
    <Container>
      <Header as='h1' textAlign='center'>Item Management</Header>
      <ErrorMessage message={this.state.errorMessage} />
      <Form>
        <ProductList />
        <Button fluid
          positive
          onClick={() => AppRouter.navigate(Routes.createItem)}
          content='Create Item' />
      </Form>
    </Container>
}
