import { Component } from 'react';
import { Grid, Button } from "semantic-ui-react";

export default class ShoppingCartRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onDelete: props.onDelete,
      price: props.price
    };
  }

  render = () =>
    <Grid.Row>
      <Grid.Column verticalAlign='middle'>{this.state.price.product.name}</Grid.Column>
      <Grid.Column>{(this.state.price.unit_amount / 100).toFixed(2)}</Grid.Column>
      <Grid.Column>
        <Button
          negative 
          content='Void'
          onClick={this.state.onDelete}/>
      </Grid.Column>
    </Grid.Row>
}