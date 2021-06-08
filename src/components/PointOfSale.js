import { Component } from "react";
import { Container, Grid, Header, Button, Card } from "semantic-ui-react";
import ProductRepository from "../services/productRepository";
import LookupItemCard from './LookupItemCard';
import ShoppingCartRow from "./ShoppingCartRow";

export default class PointOfSale extends Component {
  currentId = 0;
  constructor(props) {
    super(props);
    this.state = {
      shoppingCartItems: [],
      products: [],
    };

    ProductRepository
      .getAll()
      .then(res => this.setState({ products: res.data }));
  }

  addItem(product) {
    product.key = this.state.shoppingCartItems.length;
    var shoppingCartItems = this.state.shoppingCartItems;
    shoppingCartItems.push(product);
    this.setState({ shoppingCartItems });
  }

  removeItem = index => 
    this.setState({
      shoppingCartItems: this.state.shoppingCartItems
        .filter(i => this.state.shoppingCartItems.indexOf(i) !== index) 
    });

  render = () =>
    <Container>
      <Header as="h1" textAlign="center" content="Point of Sale" />
      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column>
            <Card.Group>
              {
                this.state.products.map(i =>
                  <LookupItemCard 
                    key={i.id}
                    product={i}
                    onClick={() => this.addItem(Object.assign({}, i))} />)
              }
            </Card.Group>
          </Grid.Column>
          <Grid.Column>
            <Grid divided columns={2}>
            {
              this.state.shoppingCartItems.map(i =>
                <ShoppingCartRow 
                  key={i.key}
                  content={i.name} 
                  onDelete={() => this.removeItem(this.state.shoppingCartItems.indexOf(i))} />)
            }
            </Grid>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>

          </Grid.Column>
          <Grid.Column>
            <Button content="Pay" />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>;
}