import { Component } from 'react';
import { getUserPermission } from '../services/session';
import { Route } from "react-router-dom";

export default class GuardedRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      permissionSet: props.permissionSet,
      component: props.component,
      path: props.path,
      defaultComponent: props.defaultComponent
    };
  }

  render() {
    var component = this.state.component;
    if (this.state.permissionSet > getUserPermission())
      component = this.state.defaultComponent;
    
    return <Route
      path={this.state.path}
      component={component} 
      />;
  }
}