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
    var shoppingCart = new ShoppingCartRepository();
    var skus = shoppingCart.getItemArray();
    
    var baseUri = `${StripeApi.orders}?currency=usd`

    // Add items to uri
    for (var i = 0; i < skus.length; i++) {
      baseUri += `&items[${i}][type]=sku`;
      baseUri += `&items[${i}][parent]=${skus[i].id}`;
      baseUri += `&items[${i}][description]=${skus[i].product.description.replace(' ', '%20')}`;
      baseUri += `&items[${i}][quantity]=${skus[i].count}`;
      baseUri += `&items[${i}][amount]=${skus[i].price}`;
    }

    return baseUri;
  }
}