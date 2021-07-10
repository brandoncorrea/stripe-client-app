import { Component } from "react";
import { Container, Header, Form, Button, Message, Dimmer, Loader } from "semantic-ui-react";
import TransactionHandler from "../data/TransactionHandler";
import AppRouter from '../AppRouter';
import { Routes } from "../Config";
import PaymentIntentRepository from "../data/PaymentIntentRepository";
import PaymentMethodRepository from "../data/PaymentMethodRepository";
import OrderStatistics from "./OrderStatistics";

export default class ManualCardTender extends Component {

  transactionHandler = new TransactionHandler();
  intentRepo = new PaymentIntentRepository();
  paymentMethodRepo = new PaymentMethodRepository();

  constructor(props) {
    super(props);
    this.state = {
      cardNumberText: '',
      expiresText: '',
      cvcText: '',
      expiresError: false,
      cvcError: false,
      cardNumberError: false,
      errorMessage: '',
      showLoader: false,
    };

    this.cardNumberOnChange = this.cardNumberOnChange.bind(this);
    this.cvcOnChange = this.cvcOnChange.bind(this);
    this.expiresOnChange = this.expiresOnChange.bind(this);
    this.submitPayment = this.submitPayment.bind(this);
  }

  // Autoformatting for the card number
  cardNumberOnChange(event, target) {
    var nums = this.getNumbers(target.value);

    // Format string separated by spaces
    var cardNumberText = '';
    for (var i = 0; i < nums.length; i++) {
      cardNumberText += nums[i];
      if ((i + 1) % 4 === 0)
        cardNumberText += ' ';
    }

    // Only take up to 19 characters (16 numbers + 3 spaces) and trim whitespace
    this.setState({ cardNumberText: cardNumberText.substr(0, 19).trim() });
  }

  // Autoformatting for the CVC
  cvcOnChange(event, target) {
    var cvcText = this.joinString(this.getNumbers(target.value)).substr(0, 3);
    this.setState({ cvcText });
  }

  // Autoformatting for the expiration date
  expiresOnChange(event, target) {
    var expiresText = this.joinString(this.getNumbers(target.value));
    var month = expiresText.substr(0, 2);
    var year = expiresText.substr(2, 2);

    // First digit must be a 0 or 1
    if (month.length === 1 && month[0] !== '0' && month[0] !== '1')
      expiresText = '';
    // Disallow month = 00
    else if (month === '00')
      expiresText = '0';
    // Disallow month > 12
    else if (month.length === 2 && Number(month) > 12)
      expiresText = month[0];
    // Format for year if it has a value
    else if (year.length > 0)
      expiresText = `${month} / ${year}`;
    // Set text to month if year has no value
    else
      expiresText = month;

    this.setState({ expiresText });
  }

  // Converts a char array to a strings
  joinString = chars => 
    chars.reduce((prev, next) => prev + next, '');

  // Converts a string to an array of chars
  toCharArray(value) {
    var chars = [];
    for (var i = 0; i < value.length; i++)
      chars.push(value[i]);
    return chars;
  }

  // Returns only the numeric values from a string
  getNumbers = value =>
    this.toCharArray(value).filter(i => {
      var num = Number(i);
      return i !== ' ' && 0 <= num && num <= 9;
    });


  // Attempts to pay the order using the entered card information
  async submitPayment() {
    this.setState({ showLoader: true });

    var expNums = this.joinString(this.getNumbers(this.state.expiresText));

    // Create the payment method
    var method = await this.paymentMethodRepo.createCard(
      Number(this.joinString(this.getNumbers(this.state.cardNumberText))),
      Number(this.state.expiresText.substring(0, 2)),
      Number(`${this.getYearPrefix()}${expNums.substr(2, 2)}`),
      Number(this.state.cvcText)
    );

    // Validate the method
    if (method.error) {
      this.setState({ 
        errorMessage: method.error.message,
        showLoader: false
      });
      return;
    }

    // Create the intent
    var intent = await this.intentRepo.pay(method.id, this.transactionHandler.getOrderTotal() * 100);

    // Validate the intent
    if (intent.error) {
      this.setState({ 
        errorMessage: intent.error.message,
        showLoader: false 
      });
      return;
    }

    // Final validation - Redirect if successful
    if (intent.status === 'succeeded') {
      this.transactionHandler.void();
      AppRouter.navigate(`${Routes.orderComplete}?orderTotal=${intent.amount / 100}&tenderAmount=${intent.amount_received / 100}&itemCount=${this.transactionHandler.getItemCount()}`);
    } else
      this.setState({ 
        errorMessage: 'An error occurred.' ,
        showLoader: false
      });
  }

  // Returns the prefix for the century (1990 => 19, 2021 => 20)
  getYearPrefix = () => 
    new Date()
    .getFullYear()
    .toString()
    .substr(0, 2);

  render = () =>
    <Container>

      <Dimmer active={this.state.showLoader}>
        <Loader size='large'>Processing</Loader>
      </Dimmer>

      <Header as='h1' textAlign='center' content='Manual Card' />
      <OrderStatistics />
      {
        this.state.errorMessage.length > 0
        ? <Message error content={this.state.errorMessage} />
        : <></>
      }
      
      <Form>
        <Form.Group widths='equal'>
          <Form.Input 
            fluid
            label='Card Number' 
            placeholder='Card Number' 
            value={this.state.cardNumberText}
            onChange={this.cardNumberOnChange}
            error={this.state.cardNumberError} />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Input
            fluid 
            label='Expires' 
            value={this.state.expiresText}
            placeholder='MM / YY' 
            onChange={this.expiresOnChange}
            error={this.state.expiresError} />
          <Form.Input
            fluid 
            label='CVC' 
            value={this.state.cvcText}
            placeholder='CVC' 
            onChange={this.cvcOnChange}
            error={this.state.cvcError}/> 
        </Form.Group>
        <Form.Group>
          <Button 
            positive
            fluid
            content='Submit'
            onClick={this.submitPayment} />
        </Form.Group>
      </Form>
    </Container>
}