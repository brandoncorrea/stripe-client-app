import * as config from '../appSettings.json';
import { StripeApi } from '../Config';
import { encodeURI } from '../helpers/encodingHelper';

const headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
  'Authorization': 'Bearer ' + config.Stripe.ApiKey
};

export default class ProductRepository {
  static products = [];

  static getAll = () =>
    fetch(StripeApi.products, {
      method: 'GET',
      headers: headers
    })
    .then(res => res.json())
    .then(json => this.products = json.data);

  static get = (productId) =>
    fetch(StripeApi.products + '/' + productId,
      {
        method: 'GET',
        headers: headers
      })
      .then(res => res.json());

  static create = (product) =>
    fetch(StripeApi.products, {
      method: 'POST',
      headers: headers,
      body: encodeURI(product)
    });

  static update = (productId, product) =>
    fetch(StripeApi.products + '/' + productId, {
      method: 'POST',
      headers: headers,
      body: encodeURI(product)
    });
  
  static delete = (productId) =>
    fetch(StripeApi.products + '/' + productId, {
      method: 'DELETE',
      headers: headers
    })
    .then(res => res.json());
}
