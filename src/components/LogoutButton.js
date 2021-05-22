import * as appSettings from '../appSettings.json';
import { GoogleLogout } from 'react-google-login';
import { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { removeSessionCookie } from '../services/session';
import AppRouter from '../AppRouter';
import { Routes } from '../Config';

export default class LogoutButton extends Component {
  onLogoutSuccess() {
    removeSessionCookie();
    AppRouter.navigate(Routes.login);
  }

  render = () =>
    <GoogleLogout 
      clientId={appSettings.Google.ClientID}
      buttonText='Logout'
      render={renderProps =>
        <Button
          negative
          content='Logout'
          onClick={renderProps.onClick} />
      }
      onLogoutSuccess={this.onLogoutSuccess}
      />
}