import { Component } from "react";
import { Card } from "semantic-ui-react";

export default class LookupItemCard extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      product: props.product,
      onClick: props.onClick
    };
  }
  
  render = () =>
    <Card
      onClick={this.state.onClick} >
      <Card.Content>
        <Card.Header content={this.state.product.name} />
        <Card.Meta />
        <Card.Description content={this.state.product.description} />
      </Card.Content>
    </Card>;
}