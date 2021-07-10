import { StripeApi } from "../Config";

export default class PaymentMethodRepository {
  createCard = (number, exp_month, exp_year, cvc) =>
    fetch(`${StripeApi.payment_methods}?type=card&card[number]=${number}&card[exp_month]=${exp_month}&card[exp_year]=${exp_year}&card[cvc]=${cvc}`,
    {
      headers: StripeApi.headers,
      method: 'POST'
    })
    .then(res => res.json());
}