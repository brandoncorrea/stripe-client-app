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
          <Icon
            name="bars" 
            size="big" 
            onClick={this.showMenu}
            style={{ float: 'left', padding: '25px', cursor: 'pointer' }} />

          <Sidebar
            as={Menu}
            animation='overlay'
            icon='labeled'
            inverted
            onHide={this.hideMenu}
            vertical
            visible={this.state.visible}
            width='thin'
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
            <Menu.Item as='a'>
              <GoogleLogout 
                clientId={appSettings.Google.ClientID}
                buttonText='Logout'
                render={renderProps =>
                  <Icon 
                    name='sign out' 
                    onClick={renderProps.onClick} />
                }
                onLogoutSuccess={this.onLogoutSuccess}
                />
              Sign Out
            </Menu.Item>
          </Sidebar>

          <Sidebar.Pusher dimmed={this.state.visible}>
            <Segment basic>
              <AppRouter />
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
    </div>
}