import { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import * as appSettings from '../appSettings.json';
import { Button } from 'semantic-ui-react';
import { removeSessionCookie, setSessionCookie } from '../services/session';

const getRefreshTiming = expires_in =>
  (expires_in || 3600 - 5 * 60) * 1000;

const refreshTokenSetup = res => {
  let refreshTiming = getRefreshTiming(res.tokenObj.expires_in);
  const refreshToken = async () => {
    const newAuthRes = await res.reloadAuthResponse();
    refreshTiming = getRefreshTiming(newAuthRes.expires_in);
    setTimeout(refreshToken, refreshTiming);
  }
  setTimeout(refreshToken, refreshTiming);
}

export default class LoginButton extends Component {
  constructor(props){
    super(props);
    this.state = {
      onSuccess: props.onSuccess
    };
  }

  onSuccess = res => {
    setSessionCookie(res.profileObj);
    refreshTokenSetup(res);
    if (this.state.onSuccess)
      this.state.onSuccess(res);
  }

  onFailure = res => removeSessionCookie();

  render = () =>
   <GoogleLogin 
      clientId={appSettings.Google.ClientID}
      buttonText='Login'
      render={renderProps =>
        <Button
          positive
          content='Login'
          onClick={renderProps.onClick} />
      }
      onSuccess={this.onSuccess}
      onFailure={this.onFailure}
      cookiePolicy={'single_host_origin'}
      isSignedIn={true}
      />;
}