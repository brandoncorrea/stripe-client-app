import { Component } from "react";
import { Card } from "semantic-ui-react";
import ProductRepository from "../services/productRepository";
import LookupItemCard from "./LookupItemCard";

export default class ItemLookuplist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      onItemClicked: props.onItemClicked
    }

    ProductRepository
      .getAll()
      .then(res => this.setState({ products: res.data }));
  }

  render = () =>
    <Card.Group>
      {
        this.state.products.map(i =>
          <LookupItemCard 
            key={i.id}
            product={i}
            onClick={this.props.onItemClicked} />)
      }
    </Card.Group>;
}