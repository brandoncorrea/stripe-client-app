import { Component } from "react";
import { Button, Container, Header } from "semantic-ui-react";
import GoogleLogin from 'react-google-login';
import * as appSettings from '../../appSettings.json';
import { navigate } from "../../AppRouter";
import { Routes } from "../../Config";

export default class Login extends Component {
  
  onLoginSuccess = res =>
     console.log(res);
  onLoginFailure = res =>
    console.log(res);

  render = () =>
      <Container>
        <Header as='h1' textAlign='center'>Login</Header>
        <Button.Group fluid>
          <GoogleLogin
            clientId={appSettings.Google.ClientID}
            buttonText="Login"
            render={renderProps =>
              <Button positive content='Login' onClick={renderProps.onClick} />
            }
            onSuccess={this.onLoginSuccess}
            onFailure={this.onLoginFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
            />;
          </Button.Group>
      </Container>;
}