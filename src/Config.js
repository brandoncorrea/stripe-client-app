import * as appSettings from './appSettings.json';

export const Routes = {
  home: '/',
  itemManagement: '/itemManagement',
  createItem: '/createItem',
  createPrice: '/createPrice',
  login: '/login',
  updateProduct: '/updateProduct',
  updatePrice: '/updatePrice',
}

export const StripeApi = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Bearer ' + appSettings.Stripe.ApiKey
  },
  products: 'https://api.stripe.com/v1/products',
  prices: 'https://api.stripe.com/v1/prices'
}
