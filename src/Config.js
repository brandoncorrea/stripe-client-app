import * as appSettings from './appSettings.json';

export const Routes = {
  home: '/',

  /* Point of Sale Routes */
  pointOfSale: '/pointOfSale',

  /* Item Management Routes */
  itemManagement: '/itemManagement',
  createItem: '/createItem',
  createPrice: '/createPrice',
  updateProduct: '/updateProduct',
  updatePrice: '/updatePrice',
  
  /* Auth Routes */
  login: '/login',
}

export const StripeApi = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Bearer ' + appSettings.Stripe.ApiKey
  },
  products: 'https://api.stripe.com/v1/products',
  prices: 'https://api.stripe.com/v1/prices'
}

export const EventNames = {
  shoppingCartItemsChanged: 'shoppingCartItemsChanged'
}