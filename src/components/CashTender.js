import { Component } from "react";
import { Container, Divider, Header, Input, Button, Form } from "semantic-ui-react";
import TransactionHandler from "../data/TransactionHandler";
import OrderStatistics from './OrderStatistics';

export default class CashTender extends Component {

  transactionHandler = new TransactionHandler();

  constructor(props) {
    super(props);
    this.state = {
      payDisabled: true,
      amount: ''
    }

    this.onAmountChanged = this.onAmountChanged.bind(this);
    this.payCash = this.payCash.bind(this);
  }

  // Returns true if the entered amount is greater than or equal to the order total
  amountSatisfied(amount) {
    if (amount.length === 0)
      return;
    if (amount[0] === '$')
      amount.substring(1);
    
    return this.transactionHandler.getOrderTotal() <= Number(amount);
  }

  onAmountChanged(event, target) {
    if (target.value.length === 0 || target.value.length < this.state.amount.length) {
      this.setState({
        amount: target.value,
        payDisabled: true
      });
      return;
    }
    
    var lastEntered = target.value[target.value.length - 1];
    var decimalIndex = this.state.amount.indexOf('.');
    if (lastEntered === ' ') return;

    // Handle multiple decimal entries
    if (lastEntered === '.' && decimalIndex >= 0)
      return
    
    // Handle more than 2 decimal places
    if (decimalIndex >= 0 && target.value.length - decimalIndex > 3)
      return;

    // Handle leading 0s
    target.value = this.trimStart(target.value, '0');
    if (target.value.length === 0 
      || target.value[0] === '.')
      target.value = '0' + target.value;

    if (Number(lastEntered) 
      || lastEntered === '.' 
      || lastEntered === '0')
      this.setState({
        amount: target.value,
        payDisabled: !this.amountSatisfied(target.value)
      });
  }

  payCash(event) {
    event.preventDefault();
  }

  trimStart(text, char) {
    var index = 0;
    while (text.length > index && text[index] === char) 
      index++;
    return text.substring(index);
  }

  render = () =>
    <Container>
      <Header as='h1' textAlign='center' content='Tender Cash' />
      <OrderStatistics />
      <Divider />
      <Form>
        <Form.Field>
          <Input 
            fluid 
            size='huge'
            label='Tender Amount $' 
            value={this.state.amount}
            onChange={this.onAmountChanged}
            />
        </Form.Field>
        <Form.Field>
          <Button 
            disabled={this.state.payDisabled}
            onClick={this.payCash}
            positive
            fluid
            size='huge'
            content='Pay' />
        </Form.Field>
      </Form>
    </Container>
}