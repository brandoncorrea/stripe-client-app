import { Component } from "react";
import { Card } from 'semantic-ui-react';
import AppRouter from "../AppRouter";
import { Routes } from "../Config";

export default class PriceCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: props.price
    }
  }

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

  getCardColor = () =>
    this.state.price.active
      ? 'green'
      : 'red';

  getFormattedPrice = () =>
    '$' + (this.state.price.unit_amount / 100).toFixed(2);

  getBillingCycle = () =>
  this.state.price.recurring 
    ? "Billed Every " +
      `${this.state.price.recurring.interval_count}` + 
      " " +
      this.intervals[this.state.price.recurring.interval] + 
      (
        this.state.price.recurring.usage_type === "metered"
        ? " by " + this.aggregate_usages[this.state.price.recurring.aggregate_usage]
        : ""
      )
    : "";

  render = () =>
    <Card 
      fluid 
      color={this.getCardColor()}
      onClick={() => AppRouter.navigate(Routes.updatePrice + '?priceId=' + this.state.price.id)}>
      <Card.Content>
        <Card.Header content={this.getFormattedPrice()} />
        <Card.Meta content={this.getBillingCycle()} />
        <Card.Description content={this.state.price.nickname} />
      </Card.Content>
    </Card>;
}