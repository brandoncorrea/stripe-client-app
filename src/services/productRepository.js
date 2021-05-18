import * as config from '../appSettings.json';

export default class ProductRepository {
  static products = [];

  static getProducts = () =>
    fetch('https://api.stripe.com/v1/products', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + config.Stripe.ApiKey
      }
    })
    .then(res => res.json())
    .then(json => this.products = json.data);
}