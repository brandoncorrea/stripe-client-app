import { Component } from "react";
import PriceRepository from "../data/PriceRepository";
import { Button, Message, Card, Form } from 'semantic-ui-react';
import PriceCard from './PriceCard';

export default class PriceList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prices: [],
      productId: props.productId,
      has_more: false
    }

    PriceRepository
      .getByProductId(this.state.productId)
      .then(res => {
        if (res.data)
          this.setState({ 
            prices: res.data,
            has_more: res.has_more
          });
      });

      this.onMoreClicked = this.onMoreClicked.bind(this);
  }

  PriceField = () =>
    this.state.prices && 
    this.state.prices.length > 0 &&
    <Card.Group itemsPerRow={2}>
      {
        this.state.prices.map(i =>
          <PriceCard 
            key={i.id}
            price={i} />)
        }
    </Card.Group>

  onMoreClicked(event) {
    event.preventDefault();
    var lastIndex = this.state.prices.length - 1;
    var priceId = this.state.prices[lastIndex].id;

    PriceRepository
      .getAfter(this.state.productId, priceId)
      .then(res => {
        var prices = this.state.prices.concat(res.data);
        var has_more = res.has_more;
        this.setState({ prices, has_more });
      });
  }

  ButtonField = () =>
    this.state.has_more
    ?
      <Button fluid
        onClick={this.onMoreClicked}
        content='More...' />
    :
      <Message content="No more items to display!" />;

  render = () =>
    <>
      <Form.Field>
        <this.PriceField />
      </Form.Field>
      <Form.Field>
        <this.ButtonField />
      </Form.Field>
    </>;
}