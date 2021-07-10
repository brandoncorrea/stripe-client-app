import { Component } from "react";
import { Button, Card } from 'semantic-ui-react';
import { EventNames } from "../Config";
import SkuRepository from "../data/SkuRepository";
import EventEmitter from "../helpers/eventEmitter";

export default class SkuCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sku: props.sku,
      errorMessage: '',
    }

    this.getFormattedPrice = this.getFormattedPrice.bind(this);
    this.deleteSku = this.deleteSku.bind(this);
  }

  // Returns the price in format: $X.XX
  getFormattedPrice = () =>
    '$' + (this.state.sku.price / 100).toFixed(2);

  // Deletes the sku and emits a skuDeleted event
  deleteSku = () =>
    new SkuRepository()
    .delete(this.state.sku.id)
    .then(res => {
      if (res.error)
        EventEmitter.dispatch(
          EventNames.skuDeletedError, {
            error: res.error,
            product: this.state.sku.product.id,
            sku: this.state.sku.id
          });
      else
        EventEmitter.dispatch(
          EventNames.skuDeleted, {
            product: this.state.sku.product.id,
            sku: this.state.sku.id
          });
    });

  render = () =>
    <Card>
      <Card.Content>
        <Card.Header textAlign='center' content={this.getFormattedPrice()} />
        <Card.Description>
          <Button basic negative fluid
            content='Delete'
            onClick={this.deleteSku} />
        </Card.Description>
      </Card.Content>
    </Card>;
}
