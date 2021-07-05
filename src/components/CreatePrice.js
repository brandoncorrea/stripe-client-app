import { Component } from "react";
import { Container, Header, Form, Button, Input, Dropdown, Label } from "semantic-ui-react";
import AppRouter from "../AppRouter";
import { Routes } from "../Config";
import PriceRepository from "../data/priceRepository";
import ErrorMessage from './ErrorMessage';

export default class CreatePrice extends Component {

  aggregate_usages = [
    { key: 'sum', text: 'Sum of usage values during period', value: 'sum' },
    { key: 'last_during_period', text: 'Most recent usage value during period', value: 'last_during_period' },
    { key: 'last_ever', text: 'Most recent usage value', value: 'last_ever' },
    { key: 'max', text: 'Maximum usage value during period', value: 'max' },
  ];

  intervals = [
    { key: 'day', text: 'Day(s)', value: 'day' },
    { key: 'week', text: 'Week(s)', value: 'week' },
    { key: 'month', text: 'Month(s)', value: 'month' },
    { key: 'year', text: 'Year(s)', value: 'year' },
  ];

  priceTypes = [
    { key: 'onetime', text: 'One Time', value: 'onetime' },
    { key: 'recurring', text: 'Recurring', value: 'recurring' }
  ];

  constructor(props) {
    super(props);
    this.state = {
      message: '',
      productId: AppRouter.getSearchParam('productId'),
      priceType: this.priceTypes[0].value,
      interval: this.intervals[2].value,
      interval_count: '1',
      aggregate_usage: this.aggregate_usages[0].value,
      metered: false,
      active: true,
      unit_amount: '0.00',
      nickname: ''
    };

    this.onAggregateUsageChanged = this.onAggregateUsageChanged.bind(this);
    this.amountOnChange = this.amountOnChange.bind(this);
    this.nicknameOnChange = this.nicknameOnChange.bind(this);
    this.priceTypeOnChange = this.priceTypeOnChange.bind(this);
    this.intervalCountOnChange = this.intervalCountOnChange.bind(this);
    this.intervalOnChange = this.intervalOnChange.bind(this);
    this.meteredOnChange = this.meteredOnChange.bind(this);
    this.activeOnChange = this.activeOnChange.bind(this);
    this.createPriceClicked = this.createPriceClicked.bind(this);
  }

  errorMessage = message => ({
    content: message,
    pointing: 'above'
  });

  getAmountError() {
    var amount = this.state.unit_amount;
    // Amount should have a value
    if (amount.length === 0)
      return this.errorMessage('Please enter a valid price.');

    // Format amount
    if (amount[0] === '$')
      amount = amount.substring(1);
    if (amount[0] === '.')
      amount = '0' + amount;

    // Validate decimal places
    var parts = amount.split('.');
    if (parts.length > 2 || (parts.length === 2 && parts[1].length > 2)) 
      return this.errorMessage('Please enter a valid price.');

    var num = Number(amount);
    if (isNaN(num))
      return this.errorMessage('Please enter a valid price.');
    if (num > 999999.99)
      return this.errorMessage('Price must be less than or equal to $999,999.99.');

    return false;
  }

  getRecurringOptions() {
    var options = { };
    options.interval = this.state.interval;
    options.interval_count = parseInt(this.state.interval_count);
    if (!this.state.meteredChecked)
      return options;
    options.usage_type = 'metered';
    options.aggregate_usage = this.state.aggregate_usage;
    return options;
  }

  getPriceRequest() {
    var request = {
      currency: 'usd',
      product: this.state.productId,
      unit_amount: this.getUnitAmount(),
      active: this.state.active,
      nickname: this.state.nickname
    }

    if (this.state.priceType === 'onetime')
      return request;

    request.recurring = {
      interval: this.state.interval,
      interval_count: this.state.interval_count
    }

    if (!this.state.metered)
      return request;

    request.recurring.usage_type = 'metered';
    request.recurring.aggregate_usage = this.state.aggregate_usage;
    return request;
  }

  getUnitAmount = () => 
    this.state.unit_amount[0] === '$' 
    ? Number(this.state.unit_amount.substring(1)) * 100
    : Number(this.state.unit_amount) * 100;

  createPriceClicked() {
    if (this.getAmountError() !== false ||
      this.getIntervalError().length > 0)
      return;

    PriceRepository
      .create(this.getPriceRequest())
      .then(res => {
        if (res.error)
          this.setState({ message: res.error.message });
        else
          this.navigateToUpdateProduct();
      });
  }

  getIntervalError() {
    if (this.state.interval_count.indexOf('.') >= 0)
      return 'Billing period must use whole numbers.';

    var num = Number(this.state.interval_count);
    if (isNaN(num) || num > 365 || num < 1 ||
      (num > 52 && this.state.interval === 'week') ||
      (num > 12 && this.state.interval === 'month') ||
      (num > 1 && this.state.interval === 'year'))
      return 'Billing period must be between 1 day and 1 year';

    return '';
  }

  navigateToUpdateProduct = () =>
    AppRouter.navigate(`${Routes.updateProduct}?productId=${this.state.productId}`);

  onAggregateUsageChanged = (event, data) =>
    this.setState({ aggregate_usage: data.value });

  amountOnChange = (event, data) =>
    this.setState({ unit_amount: data.value });

  nicknameOnChange = (event, data) =>
    this.setState({ nickname: data.value });

  priceTypeOnChange = (event, data) =>
    this.setState({ priceType: data.value });
  
  intervalCountOnChange = (event, data) =>
    this.setState({ interval_count: data.value });

  intervalOnChange = (event, data) =>
    this.setState({ interval: data.value });

  meteredOnChange = (event, data) =>
    this.setState({ metered: data.checked });

  activeOnChange = (event, data) =>
    this.setState({ active: data.checked });
  
  render = () =>
    <Container>
      <Header as='h1' textAlign='center'>Create Price</Header>
      <ErrorMessage message={this.state.message}/>
      <Form>
        <Form.Group widths="equal">
          <Form.Field
            id="nicknameInput"
            control={Input}
            label="Nickname:"
            maxLength="250"
            placeholder="Nickname"
            value={this.state.nickname}
            onChange={this.nicknameOnChange}
            />
            
          <Form.Field
            id="unitAmountInput"
            label="Amount:"
            control={Input}
            placeholder="3.99"
            maxLength="250"
            value={this.state.unit_amount}
            onChange={this.amountOnChange}
            error={this.getAmountError()}
            />
        </Form.Group>

        <Form.Field>
          <Form.Dropdown
            options={this.priceTypes}
            value={this.state.priceType}
            onChange={this.priceTypeOnChange}
            />
        </Form.Field>

        {
          this.state.priceType === "recurring" &&
          <>
            <Form.Field>
              <Input labelPosition="left">
                <Label basic>Billed Every</Label>
                <Input 
                  maxLength="3"
                  value={this.state.interval_count}
                  onChange={this.intervalCountOnChange}
                  label={
                    <Dropdown
                    options={this.intervals} 
                    value={this.state.interval}
                    onChange={this.intervalOnChange}
                    />} 
                    labelPosition="right" />
              </Input>
            </Form.Field>
            <ErrorMessage message={this.getIntervalError()} />
            <Form.Field>
              <Form.Checkbox 
                label="Metered" 
                checked={this.state.metered}
                onChange={this.meteredOnChange}/>
            </Form.Field>
          </>
        }
        
        {
          this.state.priceType === "recurring" &&
          this.state.metered &&
          <Form.Group inline>
            <Form.Field>
              <label>Charge for metered usage by</label>
            </Form.Field>
            <Form.Field>
              <Form.Dropdown
                defaultValue={this.state.aggregate_usage}
                options={this.aggregate_usages}
                onChange={this.onUsageTypeChanged}
                />
            </Form.Field>
          </Form.Group>
        }
        
        <Form.Field>
          <Form.Checkbox
            toggle
            label="Active"
            id="activeCheckbox"
            checked={this.state.active}
            onChange={this.activeOnChange}
            />
        </Form.Field>
        <Button.Group fluid>
          <Button 
            content="Cancel"
            onClick={this.navigateToUpdateProduct} />
          <Button positive 
            content="Save"
            onClick={this.createPriceClicked} />
        </Button.Group>
      </Form>
    </Container>;
}