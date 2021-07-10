import ShoppingCartRepository from "./ShoppingCartRepository";
import { StripeApi } from '../Config';

export default class OrderRepository {
  create = () => 
    fetch(this.getCreateUri(), {
      headers: StripeApi.headers,
      method: 'POST'
    })
    .then(res => res.json());

  getCreateUri() {
    // var shoppingCart = new ShoppingCartRepository();
    // var items = shoppingCart.getItemArray();
    
    // var baseUri = 'https://api.stripe.com/v1/orders?currency=usd'

    // // Add items to uri
    // for (var i = 0; i < items.length; i++) {
    //   baseUri += `&items[${i}][type]=sku`;
    //   baseUri += `&items[${i}][parent]=${items[i].product.id}`;
    //   baseUri += `&items[${i}][description]=${items[i].product.description.replace(' ', '%20')}`;
    //   baseUri += `&items[${i}][quantity]=${items[i].count}`;
    //   baseUri += `&items[${i}][amount]=${items[i].unit_amount}`;
    // }

    // return baseUri;
  }
}