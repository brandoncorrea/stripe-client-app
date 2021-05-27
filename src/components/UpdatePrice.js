import { Component } from "react";
import AppRouter from "../AppRouter";
import { Routes } from "../Config";
import PriceRepository from "../services/priceRepository";
import { Container, Header, Form, Button } from 'semantic-ui-react';
import ErrorMessage from './ErrorMessage';

export default class UpdatePrice extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: '',
      price: {
        id: AppRouter.getSearchParam('priceId'),
        active: false,
        nickname: '',
        unit_amount: 0
      }
    };

    PriceRepository
      .get(this.state.price.id)
      .then(price => {
        if (price.error)
          AppRouter.navigate(Routes.itemManagement);
        else
          this.setState({ price })
      });

    this.updatePriceClicked = this.updatePriceClicked.bind(this);
    this.onNicknameChange = this.onNicknameChange.bind(this);
    this.onActiveChange = this.onActiveChange.bind(this);
  }

  updatePriceClicked = () => 
    PriceRepository
      .update(this.state.price.id, {
        nickname: this.state.price.nickname,
        active: this.state.price.active,
      })
      .then(res => AppRouter.navigate(Routes.priceManagement + '?productId=' + this.state.price.product.id));
  
  onNicknameChange(event) {
    var price = this.state.price;
    price.nickname = event.target.value;
    this.setState({ price });
  }

  onActiveChange(event) {
    var price = this.state.price;
    price.active = event.target.checked;
    this.setState({ price });
  }

  render = () =>
    <Container>
      <Header as='h1' textAlign='center'>Update Price</Header>
      <ErrorMessage message={this.state.message}/>
      <Form>
        <Form.Field>
          <label>Nickname: </label>
          <input 
            id="nicknameInput" 
            placeholder="Nickname"
            type="text" 
            value={this.state.price.nickname}
            onChange={this.onNicknameChange}
            maxLength="250" />
        </Form.Field>
        
        <Form.Field>
          <label>Amount: </label>
          <input 
            disabled
            id="unitAmountInput" 
            placeholder="3.99"
            type="text" 
            value={(this.state.price.unit_amount / 100).toFixed(2)}
            maxLength="250" />
        </Form.Field>
        
        <Form.Field>
          <Form.Checkbox
            toggle
            label="Active"
            id="activeCheckbox"
            checked={this.state.price.active}
            onChange={this.onActiveChange}
            />
        </Form.Field>
        <Button.Group fluid>
          <Button onClick={() => AppRouter.navigate(Routes.priceManagement + '?productId=' + this.state.price.product.id)}>Cancel</Button>
          <Button positive onClick={this.updatePriceClicked}>Save</Button>
        </Button.Group>
    </Form>
  </Container>;
}