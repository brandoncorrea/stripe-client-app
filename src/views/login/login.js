import { Container } from 'semantic-ui-react';
import * as appSettings from '../../appSettings.json';
import React from 'react';
import GoogleLogin from 'react-google-login';
import { Routes } from '../../Config'
import AppRouter from '../../AppRouter';

function onSuccess(res) {
  console.log('onSuccess');
  console.log(res);
  if (res.details)
    console.log(res.details);
  AppRouter.navigate(Routes.home);
}

function onFailure(res) {
  console.log('onFailure');
  console.log(res);
  if (res.details)
    console.log(res.details);
} 

export default function Login() {

  return <Container>
      <GoogleLogin
        clientId={appSettings.Google.ClientID}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
      />
    </Container>
}