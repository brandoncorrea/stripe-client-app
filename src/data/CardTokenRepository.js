import { StripeApi } from '../Config';

export default class CardTokenRepository {

  create = (card) =>
    fetch(`https://api.stripe.com/v1/tokens?card[number]=${card.number}&card[exp_month]=${card.exp_month}&card[exp_year]=${card.exp_year}&card[cvc]=${card.cvc}`, {
      headers: StripeApi.headers,
      method: 'POST',
    })
    .then(res => res.json());

}