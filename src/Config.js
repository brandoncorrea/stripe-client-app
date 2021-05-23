import * as appSettings from './appSettings.json';

export const Routes = {
  home: '/',
  itemManagement: '/itemManagement',
  priceManagement: '/priceManagement',
  createItem: '/createItem',
  editItem: '/editItem',
  login: '/login'
}

export const StripeApi = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Bearer ' + appSettings.Stripe.ApiKey
  },
  products: 'https://api.stripe.com/v1/products',
  prices: 'https://api.stripe.com/v1/prices'
}