import { StripeApi } from '../Config';

export default class PriceRepository {
  static getByProduct = productId =>
    fetch(`${StripeApi.prices}?product=${productId}`,
      {
        method: 'GET',
        headers: StripeApi.headers
      })
      .then(res => res.json())
      .then(json => json.data);
}