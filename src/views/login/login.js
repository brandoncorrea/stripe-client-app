import { Component } from 'react';
import { Container } from 'semantic-ui-react';
import * as appSettings from '../../appSettings.json';
import React from 'react';
import GoogleLogin from 'react-google-login';


const responseGoogle = (response) => {
  console.log(response);
  console.log(response.error);
  console.log(response.details);
}

export default class Login extends Component {
  render = () =>
    <Container>
      <GoogleLogin
        clientId={appSettings.Google.ClientID}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </Container>
}