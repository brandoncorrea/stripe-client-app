import { Component } from "react";
import { Container, Grid, Header, Button, Card, Confirm } from "semantic-ui-react";
import AppRouter from "../AppRouter";
import { Routes } from "../Config";
import PriceRepository from "../services/priceRepository";
import LookupItemCard from './LookupItemCard';
import ShoppingCartRow from "./ShoppingCartRow";

export default class PointOfSale extends Component {
  currentId = 0;
  constructor(props) {
    super(props);
    this.state = {
      shoppingCartItems: [],
      prices: [],
      confirmVoidOrderOpen: false,
      confirmReturnHomeOpen: false,
    };

    PriceRepository
      .getAll()
      .then(prices => this.setState({ prices }));

    this.showConfirmVoidOrder = this.showConfirmVoidOrder.bind(this);
    this.closeConfirmVoidOrder = this.closeConfirmVoidOrder.bind(this);
    this.voidOrder = this.voidOrder.bind(this);
    this.returnToHomepage = this.returnToHomepage.bind(this);
  }

  returnToHomepage() {
    if (this.state.shoppingCartItems.length > 0)
      this.setState({ confirmReturnHomeOpen: true });
    else
      AppRouter.navigate(Routes.home);
  }

  closeConfirmReturnHome = () => this.setState({ confirmReturnHomeOpen: false });

  addItem(price) {
    price.key = this.state.shoppingCartItems.length;
    var shoppingCartItems = this.state.shoppingCartItems;
    shoppingCartItems.unshift(price);
    this.setState({ shoppingCartItems });
  }

  removeItem = index => 
    this.setState({
      shoppingCartItems: this.state.shoppingCartItems
        .filter(i => this.state.shoppingCartItems.indexOf(i) !== index) 
    });

  showConfirmVoidOrder = () => {
    if (this.state.shoppingCartItems.length > 0)
      this.setState({ confirmVoidOrderOpen: true });
  }
  closeConfirmVoidOrder = () => this.setState({ confirmVoidOrderOpen: false });
  voidOrder = () => {
    this.setState({ shoppingCartItems: [] })
    this.closeConfirmVoidOrder();
  };

  render = () =>
    <Container>
      <Header as="h1" textAlign="center" content="Point of Sale" />
      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column>
            <Card.Group style={{ overflow: 'auto', maxHeight: '600px' }} itemsPerRow={3}>
              {
                this.state.prices.map(i =>
                  <LookupItemCard 
                    key={i.id}
                    price={i}
                    onClick={() => this.addItem(Object.assign({}, i))} />)
              }
            </Card.Group>
          </Grid.Column>
          <Grid.Column>
            <Grid 
              id='shoppingCardGrid'
              divided 
              columns={3} 
              style={{ overflow: 'auto', maxHeight: '600px' }}>
            {
              this.state.shoppingCartItems.map(i =>
                <ShoppingCartRow 
                  key={i.key}
                  price={i} 
                  onDelete={() => this.removeItem(this.state.shoppingCartItems.indexOf(i))} />)
            }
            </Grid>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>

          </Grid.Column>
          <Grid.Column>
            <Button positive content="Pay" />
            <Button negative content="Void Order" onClick={this.showConfirmVoidOrder} />
            <Button content="Back" onClick={this.returnToHomepage} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Confirm
        content='Are you sure you want to void the order?'
        cancelButton='Return to Order'
        confirmButton='Void the Order'
        open={this.state.confirmVoidOrderOpen}
        onCancel={this.closeConfirmVoidOrder}
        onConfirm={this.voidOrder}
        />
      <Confirm
        content='Are you sure you want to exit to the Homepage? The current order will be voided.'
        cancelButton='Return to Order'
        confirmButton='Void and Exit'
        open={this.state.confirmReturnHomeOpen}
        onCancel={this.closeConfirmReturnHome}
        onConfirm={() => AppRouter.navigate(Routes.home)}
        />
    </Container>;
}