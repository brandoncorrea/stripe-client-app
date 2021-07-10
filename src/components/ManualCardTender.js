import { Component } from "react";
import { Container, Header, Form, Button, Message } from "semantic-ui-react";
import CardTokenRepository from "../data/CardTokenRepository";
import OrderRepository from "../data/OrderRepository";
import TransactionHandler from "../data/TransactionHandler";

export default class ManualCardTender extends Component {

  transactionHandler = new TransactionHandler();
  cardTokenRepo = new CardTokenRepository();
  orderRepo = new OrderRepository();

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
    };

    this.orderRepo.create();

    this.cardNumberOnChange = this.cardNumberOnChange.bind(this);
    this.cvcOnChange = this.cvcOnChange.bind(this);
    this.expiresOnChange = this.expiresOnChange.bind(this);
    this.submitPayment = this.submitPayment.bind(this);
  }

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

  cvcOnChange(event, target) {
    var cvcText = this.joinString(this.getNumbers(target.value)).substr(0, 3);
    this.setState({ cvcText });
  }

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

  joinString(chars) {
    var str = '';
    chars.forEach(c => str = `${str}${c}`);
    return str;
  }

  getNumbers = value =>
    this.toCharArray(value).filter(i => {
      var num = Number(i);
      return i !== ' ' && 0 <= num && num <= 9;
    });

  toCharArray(value) {
    var chars = [];
    for (var i = 0; i < value.length; i++)
      chars.push(value[i]);
    return chars;
  }

  submitPayment() {

    var expiresError = this.getExpirationError();
    var cvcError = this.getCvcError();
    var cardNumberError = this.getCardNumberError();

    if (expiresError || cvcError || cardNumberError){
      this.setState ({
        expiresError, 
        cvcError, 
        cardNumberError
      });

      return;
    }

    var cardNumber = Number(this.joinString(this.getNumbers(this.state.cardNumberText)));
    var cvc = Number(this.state.cvcText);
    var expNums = this.joinString(this.getNumbers(this.state.expiresText));
    var expMonth = Number(this.state.expiresText.substring(0, 2));
    var expYear = Number(`${this.getYearPrefix()}${expNums.substr(2, 2)}`);

    this.cardTokenRepo.create({
      number: cardNumber,
      exp_month: expMonth,
      exp_year: expYear,
      cvc: cvc
    })
    .then(data => {
      if (data.error)
        this.setState({ errorMessage: data.error.message });
      else
        this.transactionHandler.setPaymentToken(data.id);
    });
  }

  getYearPrefix = () => 
    new Date()
    .getFullYear()
    .toString()
    .substr(0, 2);

  getCardNumberError() {
    if (this.state.cardNumberText.length > 0)
      return false;
    return {
      content: 'Please enter a card number.',
      pointing: 'above'
    };
  }

  getCvcError() {
    if (this.state.cvcText.length === 3)
      return false;
    return {
      content: 'Please enter a valid CVC code.',
      pointing: 'above'
    };
  }

  getExpirationError() {
    var expNums = this.joinString(this.getNumbers(this.state.expiresText));
    if (expNums.length !== 4)
      return {
        content: 'Please enter a valid date.',
        pointing: 'above'
      };
    
    var month = Number(expNums.substring(0, 2));
    var year = Number(`${this.getYearPrefix()}${expNums.substr(2, 2)}`);
    var today = new Date();
    var exp = new Date(year, month, 0);

    if (exp < today)
      return {
        content: 'Please enter a future date.',
        pointing: 'above'
      }

    console.log('returning false')
    return false;
  }

  render = () =>
    <Container>
      <Header as='h1' textAlign='center' content='Manual Card' />
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