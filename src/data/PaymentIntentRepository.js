import { StripeApi } from "../Config";

export default class PaymentIntentRepository {
  pay = (methodId, amount) =>
    fetch(`${StripeApi.payment_intents}?amount=${amount}&payment_method=${methodId}&confirm=true&currency=usd&receipt_email=bwancor@gmail.com`, 
    {
      headers: StripeApi.headers,
      method: 'POST'
    })
    .then(res => res.json());
}