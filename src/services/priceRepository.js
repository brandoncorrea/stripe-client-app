import { StripeApi } from '../Config';
import { encodeURI } from '../helpers/encodingHelper';

export default class PriceRepository {
  static getByProduct = productId =>
    fetch(`${StripeApi.prices}?product=${productId}`,
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
}