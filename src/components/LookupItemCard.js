import { Component } from "react";
import { Card } from "semantic-ui-react";

export default class LookupItemCard extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      sku: props.sku,
      onClick: props.onClick
    };
  }
  
  render = () =>
    <Card
      onClick={this.state.onClick} >
      <Card.Content>
        <Card.Header content={this.state.sku.product.name} />
        <Card.Meta content={(this.state.sku.price / 100).toFixed(2)} />
        <Card.Description content={this.state.sku.product.description} />
      </Card.Content>
    </Card>;
}