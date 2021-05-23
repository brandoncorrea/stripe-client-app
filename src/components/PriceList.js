import { Component } from "react";
import { Message } from "semantic-ui-react";
import PriceRepository from "../services/priceRepository";
import PriceCard from './PriceCard';

export default class PriceList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      prices: []
    }

    PriceRepository
      .getByProduct(props.productId)
      .then(prices => this.setState({ prices }));
  }

  render = () =>
    this.state.prices.length > 0 
    ?
    this.state.prices.map(price =>
      <PriceCard 
        key={price.id}
        price={price} /> )
    :
    <Message content='No prices to display.' />
}
