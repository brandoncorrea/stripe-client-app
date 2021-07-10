import { Component } from "react";
import { Card, Icon, Button } from "semantic-ui-react";
import { EventNames } from "../Config";
import ShoppingCartRepository from "../data/ShoppingCartRepository";
import EventEmitter from "../helpers/eventEmitter";

export default class LookupItemCard extends Component {
  shoppingCart = new ShoppingCartRepository();
  constructor(props) {
    super(props);
    this.state = {
      sku: props.sku,
      onClick: props.onClick,
      metaContent: '',
    };

    this.state.metaContent = this.getMetaContent();

    this.addItem = this.addItem.bind(this);
    this.voidItem = this.voidItem.bind(this);

    EventEmitter.subscribe(
      EventNames.shoppingCartItemsChanged,
      this.onShoppingCartItemsChanged);
  }

  componentWillUnmount = () =>
    EventEmitter.unsubscribe(
      EventNames.shoppingCartItemsChanged,
      this.onShoppingCartItemsChanged)

  onShoppingCartItemsChanged = () =>
    this.setState({ metaContent: this.getMetaContent() });

  addItem = () =>
    this.shoppingCart.addItem(this.state.sku);

  voidItem = () =>
    this.shoppingCart.voidItem(this.state.sku.id);

  getMetaContent() {
    var count = this.getItemCount();
    var metaContent = this.getFormattedPrice();
    if (count > 0)
      return metaContent + ` x ${count}`;
    return metaContent;
  }

  getItemCount() {
    var sku = this.shoppingCart
      .getItemArray()
      .find(i => i.id === this.state.sku.id);
    if (sku)
      return sku.count;
    return 0;
  }

  getFormattedPrice = () =>
    (this.state.sku.price / 100).toFixed(2)
  
  render = () =>
    <Card>
      <Card.Content>
        <Card.Header content={this.state.sku.product.name} />
        <Card.Meta content={this.state.metaContent} />
        <Card.Description content={this.state.sku.product.description} />
      </Card.Content>
      <Card.Content extra>
        <Button.Group fluid>
          <Button basic negative
            content={<Icon name='minus' />}
            onClick={this.voidItem} />
          <Button basic positive 
            content={<Icon name='plus' />}
            onClick={this.addItem} />
        </Button.Group>
      </Card.Content>
    </Card>;
}