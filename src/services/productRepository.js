import * as config from '../appSettings.json';
import { StripeApi } from '../Config';

const headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
  'Authorization': 'Bearer ' + config.Stripe.ApiKey
};

function encodeURIObject(obj) {
  var formBody = [];
  for (var property in obj) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(obj[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }  
  return formBody.join("&");
}

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
      body: encodeURIObject({
        name: item.name,
        description: item.description
      })
    });
}
