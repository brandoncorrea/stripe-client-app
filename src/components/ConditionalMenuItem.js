import { Component } from "react";
import { Menu } from "semantic-ui-react";

export default class ConditionalMenuItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      commonProps: {},
      visible: props.visible
    }

    Object.keys(props)
      .filter(i => i !== 'visible')
      .forEach(k => this.state.commonProps[k] = props[k]);
  }

  render = () =>
    this.state.visible
    ? 
      <Menu.Item {... this.state.commonProps} />
    : 
      <></>
}