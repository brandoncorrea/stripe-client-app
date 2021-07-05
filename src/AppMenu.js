import { Component } from "react";
import { Grid, Sidebar, Menu, Segment, Icon } from 'semantic-ui-react';
import AppRouter from './AppRouter';
import { Routes } from "./Config";

export default class AppMenu extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };

    this.setVisible = this.setVisible.bind(this);
    this.hideMenu = this.hideMenu.bind(this);
    this.showMenu = this.showMenu.bind(this);
  }

  setVisible = visible => this.setState({ visible });
  hideMenu = () => this.setVisible(false);
  showMenu = () => this.setVisible(true);
  navigate = path => AppRouter.navigate(path);

  render = () => 
    <div>
        <Sidebar.Pushable as={Segment}>
          <Icon
            name="bars" 
            size="big" 
            onClick={this.showMenu}
            style={{ float: 'left', padding: '10px', cursor: 'pointer' }} />

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
              onClick={() => this.navigate(Routes.pointOfSale)}>
              <Icon name='shopping cart' />
              Cart
            </Menu.Item>
            <Menu.Item as='a'
              onClick={() => this.navigate(Routes.itemManagement)}>
              <Icon name='sliders' />
              Item Management
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