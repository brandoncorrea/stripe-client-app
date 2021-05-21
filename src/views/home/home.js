import { Component } from "react";
import { Container, Header, Card } from "semantic-ui-react";
import AppRouter from "../../AppRouter";
import { Routes } from '../../Config';

export default class Home extends Component {
  render = () =>
    <Container>
      <Header as='h1' textAlign='center'>Main Menu</Header>
      <Card.Group>
        <Card
          fluid 
          header='Item Management' 
          onClick={() => AppRouter.navigate(Routes.itemManagement)}/>
      </Card.Group>
    </Container>
}