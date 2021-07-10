import { StripeApi } from '../Config';
import { encodeURI } from '../helpers/encodingHelper';

export default class ProductRepository {

  static getById = productId =>
    fetch(StripeApi.products + '/' + productId, {
      method: 'GET',
      headers: StripeApi.headers
    })
    .then(res => res.json());

  static getAll = () =>
    fetch(StripeApi.products, {
      method: 'GET',
      headers: StripeApi.headers
    })
    .then(res => res.json());

  static getAfter = productId => 
    fetch(`${StripeApi.products}?starting_after=${productId}`, {
      method: 'GET',
      headers: StripeApi.headers
    })
    .then(res => res.json());

  static create = product =>
    fetch(StripeApi.products, {
      method: 'POST',
      headers: StripeApi.headers,
      body: encodeURI(product)
    })
    .then(res => res.json());

  static update = (productId, product) =>
    fetch(StripeApi.products + '/' + productId, {
      method: 'POST',
      headers: StripeApi.headers,
      body: encodeURI(product)
    })
    .then(res => res.json());

    static activate = productId =>
      ProductRepository.update(productId, { active: true });

    static deactivate = productId =>
      ProductRepository.update(productId, { active: false });

    static delete = productId =>
      fetch(StripeApi.products + '/' + productId, {
        method: 'DELETE',
        headers: StripeApi.headers
      })
      .then(res => res.json());
}
