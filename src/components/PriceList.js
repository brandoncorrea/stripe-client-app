import { Component } from "react";
import PriceRepository from "../services/priceRepository";
import { Button, Message, Card } from 'semantic-ui-react';
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
      .then(res => this.setState({ 
        prices: res.data,
        has_more: res.has_more
      }));
  }

  PriceField = () =>
    this.state.prices && 
    this.state.prices.length > 0 &&
    <Card.Group>
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
      <Message>
        No more items to display!
      </Message>;

  render = () =>
    <>
      <this.PriceField />
      <this.ButtonField />
    </>;
}