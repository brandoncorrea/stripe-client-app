import { Component } from 'react';
import { Button, Container, Header } from 'semantic-ui-react';
import AppRouter from '../AppRouter';
import { Routes } from '../Config';
import { getUser } from '../services/session';
import LoginButton from './LoginButton';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onSuccess: props.onSuccess
    };

    if (getUser())
      AppRouter.navigate(Routes.home);
  }

  render = () =>
    <Container style={{ padding: '10px' }}>
      <Header as='h1' textAlign='center'>Login</Header>
      <Button.Group fluid>
        <LoginButton onSuccess={this.state.onSuccess}/>
      </Button.Group>
    </Container>
}