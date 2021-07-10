import { StripeApi } from '../Config';

export default class SkuRepository {
  create = (productId, price) =>
    fetch(`${StripeApi.skus}?currency=usd&inventory[type]=infinite&price=${price}&product=${productId}`, 
    {
      headers: StripeApi.headers,
      method: 'POST'
    })
    .then(res => res.json());

  update = (sku, price) =>
    fetch(`${StripeApi.skus}/${sku}?price=${price}`,
    {
      headers: StripeApi.headers,
      method: 'POST'
    })
    .then(res => res.json());

  delete = sku =>
    fetch(`${StripeApi.skus}/${sku}`, 
    {
      headers: StripeApi.headers,
      method: 'DELETE'
    })
    .then(res => res.json());

  findByProductId = productId =>
    fetch(`${StripeApi.skus}?product=${productId}&active=true&expand[]=data.product`,
    {
      headers: StripeApi.headers,
      method: 'GET'
    })
    .then(res => res.json());

  findByProductIdAfter = (productId, sku) =>
    fetch(`${StripeApi.skus}?product=${productId}&starting_after=${sku}&expand[]=data.product`,
    {
      headers: StripeApi.headers,
      method: 'GET'
    })
    .then(res => res.json());

  getAll = () =>
    fetch(`${StripeApi.skus}?expand[]=data.product`,
    {
      headers: StripeApi.headers,
      method: 'GET'
    })
    .then(res => res.json());

  getAllAfter = sku =>
    fetch(`${StripeApi.skus}?starting_after=${sku}&expand[]=data.product`,
    {
      headers: StripeApi.headers,
      method: 'GET'
    })
    .then(res => res.json());

  getAllBefore = sku =>
    fetch(`${StripeApi.skus}?ending_before=${sku}&expand[]=data.product`,
    {
      headers: StripeApi.headers,
      method: 'GET'
    })
    .then(res => res.json());
    
}