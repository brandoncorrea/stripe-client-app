import { Component } from "react";
import { Card } from 'semantic-ui-react';
import PriceRepository from "../services/priceRepository";
import ActivationToggle from "./ActivationToggle";
import ProductCardEditor from "./ProductCardEditor";
import ProductCardStandard from './ProductCardStandard';

export default class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      product: props.product,
      price: {
        unit_amount: 0
      },
    }

    PriceRepository
      .getActive(this.state.product.id)
      .then(prices => {
        if (prices.length > 0)
          this.setState({ price: prices[0] });
        this.forceUpdate();
      });
  }

  getCardColor = () =>
    this.state.product.active 
      ? 'green' 
      : 'red';

  render = () =>
    <Card fluid color={this.getCardColor()}>
      {
        this.state.editing
        ? 
        <ProductCardEditor 
          product={this.state.product}
          price={this.state.price}
          onSave={(product, price) => this.setState({ product, price, editing: false })}
          onCancel={() => this.setState({ editing: false })}
          />
        : 
        <ProductCardStandard 
          product={this.state.product}
          price={this.state.price}
          onEdit={() => this.setState({ editing: true })}
          />
      }
      <Card.Content extra>
        <ActivationToggle 
          product={this.state.product}
          onChange={product => this.setState({ product })} />
      </Card.Content>
    </Card>;
}