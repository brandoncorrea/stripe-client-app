import { Component } from "react";
import { Container, Header } from "semantic-ui-react";
import { getUser } from "../services/session";

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
    </Container>;
}