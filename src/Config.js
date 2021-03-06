import * as appSettings from './appSettings.json';

export const Routes = {
  home: '/',

  cart: '/cart',
  lookup: '/lookup',
  checkout: '/checkout',

  manualCardTender: '/tender/manualCard',
  cashTender: '/tender/cash',
  orderComplete: '/order/complete',

  /* Item Management Routes */
  itemManagement: '/itemManagement',
  createItem: '/createItem',
  createSku: '/createSku',
  updateProduct: '/updateProduct',
  
  /* Auth Routes */
  login: '/login',
}

export const StripeApi = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Bearer ' + appSettings.Stripe.ApiKey
  },
  products: 'https://api.stripe.com/v1/products',
  skus: 'https://api.stripe.com/v1/skus',
  orders: 'https://api.stripe.com/v1/orders',
  payment_intents: 'https://api.stripe.com/v1/payment_intents',
  payment_methods: 'https://api.stripe.com/v1/payment_methods',
}

export const EventNames = {
  shoppingCartItemsChanged: 'shoppingCartItemsChanged',
  skuDeleted: 'skuDeleted',
  productDeleted: 'productDeleted',
  skuDeletedError: 'skuDeletedError',
  productDeletedError: 'productDeletedError',
}