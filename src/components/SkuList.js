import { Component } from "react";
import SkuRepository from  '../data/SkuRepository';
import { Button, Message, Card, Form } from 'semantic-ui-react';
import SkuCard from './SkuCard';
import Guid from "../helpers/Guid";
import EventEmitter from "../helpers/eventEmitter";
import { EventNames } from "../Config";

export default class SkuList extends Component {
  skuRepo = new SkuRepository();

  constructor(props) {
    super(props);
    this.state = {
      skus: [],
      productId: props.productId,
      has_more: false
    }

    // Initialize skus
    this.skuRepo
      .findByProductId(this.state.productId)
      .then(res => {
        if (res.data)
          this.setState({ 
            skus: res.data,
            has_more: res.has_more
          });
      });

    this.onSkuDeleted = this.onSkuDeleted.bind(this);
    this.onMoreClicked = this.onMoreClicked.bind(this);

    EventEmitter.subscribe(
      EventNames.skuDeleted,
      this.onSkuDeleted);
  }

  // Triggered when a Sku is deleted
  onSkuDeleted = data =>
    this.setState({
      skus: this.state.skus.filter(i => i.id !== data.sku)
    });

  // Returns the last sku in the sku list
  getLastSku = () =>
    this.state.skus[
      this.state.skus.length - 1
    ]

  // Displays additional skus for the product
  onMoreClicked(event) {
    event.preventDefault();
    this.skuRepo
      .findByProductIdAfter(
        this.state.productId, 
        this.getLastSku().id)
      .then(res => {
        var skus = this.state.skus.concat(res.data);
        var has_more = res.has_more;
        this.setState({ skus, has_more });
      });
  }

  render = () =>
    <>
      <Form.Field>
        {
          this.state.skus && 
          this.state.skus.length > 0 &&
          <Card.Group itemsPerRow={2}>
            {
              this.state.skus.map(i =>
                <SkuCard 
                  key={Guid.newGuid()}
                  sku={i} />)
            }
          </Card.Group>
        }
      </Form.Field>
      <Form.Field>
        {
          this.state.has_more
          ?
            <Button fluid
              onClick={this.onMoreClicked}
              content='More...' />
          :
            <Message content="No more items to display!" />
        }
      </Form.Field>
    </>;
}