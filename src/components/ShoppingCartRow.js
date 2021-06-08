import { Component } from 'react';
import { Grid, Button } from "semantic-ui-react";

export default class ShoppingCartRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onDelete: props.onDelete,
      content: props.content
    };
  }

  render = () =>
    <Grid.Row>
      <Grid.Column verticalAlign='middle'>{this.state.content}</Grid.Column>
      <Grid.Column>
        <Button
          negative 
          content='Void'
          onClick={this.state.onDelete}/>
      </Grid.Column>
    </Grid.Row>
}