import { Container, Header, Card, Button, Form } from "semantic-ui-react";
import { navigate } from "../../AppRouter";
import { Routes } from '../../Config';
import GoogleLogout from 'react-google-login';
import * as appSettings from '../../appSettings.json';
import { Component } from "react";

export default class Home extends Component {
  
  render = () => 
    <Container>
      <Header as='h1' textAlign='center'>Main Menu</Header>
      <Form>
        <Form.Field>
          <Card.Group>
            <Card
              fluid 
              header='Item Management' 
              onClick={() => navigate(Routes.itemManagement)}/>
          </Card.Group>
        </Form.Field>

        <Form.Field>
          <Button.Group fluid>
            <GoogleLogout
              clientId={appSettings.Google.ClientID}
              buttonText="Logout"
              render={renderProps =>
                <Button negative content='Logout' onClick={renderProps.onClick} />
              }
              onLogoutSuccess={() => navigate(Routes.home)}
              />;
          </Button.Group>
        </Form.Field>
      </Form>
    </Container>
}