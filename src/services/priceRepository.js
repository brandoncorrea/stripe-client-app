import { StripeApi } from '../Config';
import { encodeURI } from '../helpers/encodingHelper';

export default class PriceRepository {
  
  static get = priceId =>
    fetch(`${StripeApi.prices}/${priceId}?expand[]=product`, {
      method: 'GET',
      headers: StripeApi.headers
    })
    .then(res => res.json());

  static getAfter = (productId, priceId) =>
    fetch(`${StripeApi.prices}?product=${productId}&starting_after=${priceId}`, {
      method: 'GET',
      headers: StripeApi.headers
    })
    .then(res => res.json());
  
  static getByProductId = productId => 
    fetch(`${StripeApi.prices}?product=${productId}`, {
      method: 'GET',
      headers: StripeApi.headers
    })
    .then(res => res.json());

  static getActive = productId =>
    fetch(`${StripeApi.prices}?product=${productId}&active=true`, 
    {
      method: 'GET',
      headers: StripeApi.headers
    })
    .then(res => res.json())
    .then(json => json.data);

  static create = priceRequest =>
    fetch(StripeApi.prices, 
      {
        method: 'POST',
        headers: StripeApi.headers,
        body: encodeURI(priceRequest)
      })
      .then(res => res.json());

  static createUnitPrice = (productId, unit_amount) =>
    PriceRepository.create({
      currency: 'usd',
      unit_amount,
      product: productId,
      billing_scheme: 'per_unit'
    });

  static deactivate = priceId => 
    PriceRepository.update(priceId, { active: false });

  static update = (priceId, priceRequest) =>
    fetch(`${StripeApi.prices}/${priceId}`,
      {
        method: 'POST',
        headers: StripeApi.headers,
        body: encodeURI(priceRequest)
      })
      .then(res => res.json());
}