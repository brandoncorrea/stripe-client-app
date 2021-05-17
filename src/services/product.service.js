const apiKey = "sk_test_51IrVNZG7Ju0h24cElyUi1yo3hHgBBJsBgGoTVmfb6d5Uzih6ChX44zEqy6Bqhm6ArxVFGRfns98dVHCcykEN40ld00kBUJPQxr";

export default class ProductRepository {
  products = [];
  constructor(){
    fetch('https://api.stripe.com/v1/products', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + apiKey
      }
    })
    .then(res => res.json())
    .then(json => this.products = json.data);
  }
}