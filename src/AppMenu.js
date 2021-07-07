import { Component } from "react";
import { Sidebar, Menu, Segment, Icon } from 'semantic-ui-react';
import AppRouter from './AppRouter';
import { Routes } from "./Config";
import * as appSettings from './appSettings.json';
import { GoogleLogout } from 'react-google-login';
import { removeSessionCookie } from './services/session';

export default class AppMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };

    this.setVisible = this.setVisible.bind(this);
    this.hideMenu = this.hideMenu.bind(this);
    this.showMenu = this.showMenu.bind(this);
    this.onLogoutSuccess = this.onLogoutSuccess.bind(this);
  }

  setVisible = visible => this.setState({ visible });
  hideMenu = () => this.setVisible(false);
  showMenu = () => this.setVisible(true);
  navigate = path => AppRouter.navigate(path);
  onLogoutSuccess() {
    removeSessionCookie();
    AppRouter.navigate(Routes.login);
  }

  render = () => 
    <div>
      <Sidebar.Pushable as={Segment}>
        <Sidebar
          as={Menu}
          animation='overlay'
          icon='labeled'
          inverted
          onHide={this.hideMenu}
          vertical
          visible={this.state.visible}
          width='thin'
          style={{ zIndex: '10' }}
          >
          <Menu.Item as='a'
            onClick={() => this.navigate(Routes.home)}>
            <Icon name='home' />
            Home
          </Menu.Item>
          <Menu.Item as='a'
            onClick={() => this.navigate(Routes.lookup)}>
            <Icon name='search' />
            Item Lookup
          </Menu.Item>
          <Menu.Item as='a'
            onClick={() => this.navigate(Routes.cart)}>
            <Icon name='shopping cart' />
            Cart
          </Menu.Item>
          <Menu.Item as='a'
            onClick={() => this.navigate(Routes.itemManagement)}>
            <Icon name='sliders' />
            Item Management
          </Menu.Item>
          <GoogleLogout 
            clientId={appSettings.Google.ClientID}
            buttonText='Logout'
            render={renderProps =>
              <Menu.Item as='a'
                onClick={renderProps.onClick}>
                <Icon name='sign out' />
                Sign Out
              </Menu.Item>
            }
            onLogoutSuccess={this.onLogoutSuccess}
            />
        </Sidebar>

        <Sidebar.Pusher 
          style={{ width: '100%', zIndex: -1 }} 
          dimmed={this.state.visible}>
          <Segment basic clearing>
            <Icon
              name="bars" 
              size="big" 
              onClick={this.showMenu}
              style={{ cursor: 'pointer', float: 'left' }} 
              />
            <AppRouter />
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </div>
}