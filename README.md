# stripe-client-app
 Point-of-Sale web interface utilizing the Stripe API

## appSettings.json Configuration
> Add your Google Auth API Key here in order to enable Google Sign-In. 
> Add your Stripe API Key here in order to access the Stripe API.
> User access is currently being managed here under the Users node. If a user requires access, add their email address here.

## Stripe Checkout for Café and Resource Area

### Vision:
> Currently we use Square terminals for all POS functions but we are working on unifying
payment processors and need to move over to Stripe.

> Our Café is open on the weekends and throughout the week. Our resource area is open on the
weekends and for special events so products constantly change.

> Much like Starbucks, people come to the café, request items, the volunteer enters the order
into the terminal, receives payment, and fulfills the order.
I looked at some ready made solutions but they were much too big and complicated. (And
expensive relative to the no-profit model that the café and resources uses.)

### Requirements:
> Ability for Café and Resource personnel to take orders, accept in person payments and fulfill the order on the spot.

> Ability to choose multiple items

> Ability to receive cash, credit card, or Apple/Google Pay

> Metrics of how much was sold, sales by product, and sales per service time.

> Ability to give discounts

> UI would be used on an iPad but doesn’t need to be a native app.

> Easy way for Café and Hospitality staff to update products without going into Stripe. (They won't have access)

### Resources:
> https://stripe.com/docs/payments/checkout
