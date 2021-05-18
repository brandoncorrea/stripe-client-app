import * as config from '../appSettings.json';
import { StripeApi } from '../Config';
import '../helpers/objectExtensions';

const headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
  'Authorization': 'Bearer ' + config.Stripe.ApiKey
};

export default class ProductRepository {
  static products = [];

  static getProducts = () =>
    fetch(StripeApi.products, {
      method: 'GET',
      headers: headers
    })
    .then(res => res.json())
    .then(json => this.products = json.data);

  static createItem = (item) =>
    fetch(StripeApi.products, {
      method: 'POST',
      headers: headers,
      body: {
        name: item.name,
        description: item.description
      }.encodeURI()
    });
}
