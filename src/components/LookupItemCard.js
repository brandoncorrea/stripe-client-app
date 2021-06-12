import { Component } from "react";
import { Card } from "semantic-ui-react";

export default class LookupItemCard extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      price: props.price,
      onClick: props.onClick
    };
  }
  
  render = () =>
    <Card
      onClick={this.state.onClick} >
      <Card.Content>
        <Card.Header content={this.state.price.product.name} />
        <Card.Meta content={(this.state.price.unit_amount / 100).toFixed(2)} />
        <Card.Description content={this.state.price.product.description} />
      </Card.Content>
    </Card>;
}