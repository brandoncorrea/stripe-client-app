import { StripeApi } from '../Config';
import { encodeURI } from '../helpers/encodingHelper';

export default class ProductRepository {
  static getAll = () =>
    fetch(StripeApi.products, {
      method: 'GET',
      headers: StripeApi.headers
    })
    .then(res => res.json())
    .then(json => json.data);

  static get = (productId) =>
    fetch(StripeApi.products + '/' + productId,
      {
        method: 'GET',
        headers: StripeApi.headers
      })
      .then(res => res.json());

  static create = (product) =>
    fetch(StripeApi.products, {
      method: 'POST',
      headers: StripeApi.headers,
      body: encodeURI(product)
    });

  static update = (productId, product) =>
    fetch(StripeApi.products + '/' + productId, {
      method: 'POST',
      headers: StripeApi.headers,
      body: encodeURI(product)
    });
  
  static delete = (productId) =>
    fetch(StripeApi.products + '/' + productId, {
      method: 'DELETE',
      headers: StripeApi.headers
    })
    .then(res => res.json());
}
