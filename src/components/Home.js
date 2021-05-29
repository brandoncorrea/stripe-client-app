import { Component } from "react";
import { Container, Header, Card, Button, Form } from "semantic-ui-react";
import AppRouter from "../AppRouter";
import { Routes } from '../Config';
import { getUser, getUserPermission } from "../services/session";
import LogoutButton from './LogoutButton';

export default class Home extends Component{

  constructor(props){
    super(props);
    this.state = {
      user: getUser()
    };
  }

  render = () =>
    <Container>
      <Header as='h1' textAlign='center'>Main Menu</Header>
      <Header as='h3' textAlign='center'>{this.state.user.name}</Header>
      <Form>
        {
          getUserPermission() >= 2 &&
          <Form.Field>
            <Card.Group>
              <Card
                fluid 
                header='Item Management' 
                onClick={() => AppRouter.navigate(Routes.itemManagement)}/>
            </Card.Group>
          </Form.Field>
        }

        <Form.Field>
          <Button.Group fluid>
            <LogoutButton />;
          </Button.Group>
        </Form.Field>
      </Form>
    </Container>;
}