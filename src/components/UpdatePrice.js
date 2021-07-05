import { Component } from "react";
import AppRouter from "../AppRouter";
import { Routes } from "../Config";
import PriceRepository from "../data/priceRepository";
import { Container, Header, Form, Button, Label } from 'semantic-ui-react';
import ErrorMessage from './ErrorMessage';

export default class UpdatePrice extends Component {

  intervals = {
    'day': 'Day(s)', 
    'week': 'Week(s)', 
    'month': 'Month(s)',
    'year': 'Year(s)', 
  };

  aggregate_usages = {
    'sum': 'Sum of usage values during period',
    'last_during_period': 'Most recent usage value during period',
    'last_ever': 'Most recent usage value',
    'max': 'Maximum usage value during period',
  }

  constructor(props) {
    super(props);
    this.state = {
      message: '',
      price: {
        id: AppRouter.getSearchParam('priceId'),
        active: false,
        nickname: '',
        unit_amount: 0,
        type: '',
        recurring: {
          interval_count: '',
          interval: '',
          usage_type: '',
        }
      }
    };

    PriceRepository
      .get(this.state.price.id)
      .then(price => {
        if (price.error)
          AppRouter.navigate(Routes.itemManagement);
        if (!price.nickname)
          price.nickname = '';
        this.setState({ price })
      });

    this.updatePriceClicked = this.updatePriceClicked.bind(this);
    this.onNicknameChange = this.onNicknameChange.bind(this);
    this.onActiveChange = this.onActiveChange.bind(this);
  }

  updatePriceClicked() {
    PriceRepository
    .update(this.state.price.id, {
      nickname: this.state.price.nickname,
      active: this.state.price.active,
    })
    .then(res => AppRouter.navigate(Routes.updateProduct + '?productId=' + this.state.price.product.id));
  
  }
    
  onNicknameChange(event, data) {
    var price = this.state.price;
    price.nickname = event.target.value;
    this.setState({ price });
  }

  onActiveChange(event, data) {
    var price = this.state.price;
    price.active = data.checked;
    this.setState({ price });
  }

  getBillingCycle = () =>
    "Billed Every " +
    `${this.state.price.recurring.interval_count}` + 
    " " +
    this.intervals[this.state.price.recurring.interval] + 
    (
      this.state.price.recurring.usage_type === "metered"
      ? " by " + this.aggregate_usages[this.state.price.recurring.aggregate_usage]
      : ""
    );

  render = () =>
    <Container>
      <Header as='h1' textAlign='center'>Update Price</Header>
      <ErrorMessage message={this.state.message}/>
      <Form>

        <Form.Group widths="equal">
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
        </Form.Group>

        {
          this.state.price.type === "recurring" &&
          <Form.Field>
            <Label basic>{this.getBillingCycle()}</Label>
          </Form.Field>
        }

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
          <Button onClick={() => AppRouter.navigate(Routes.updateProduct + '?productId=' + this.state.price.product.id)}>Cancel</Button>
          <Button positive onClick={this.updatePriceClicked}>Save</Button>
        </Button.Group>
    </Form>
  </Container>;
}