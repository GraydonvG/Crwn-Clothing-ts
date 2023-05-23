import { loadStripe, type StripeElementsOptions } from '@stripe/stripe-js';

const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

export const stripePromise = loadStripe(stripePublishableKey);

const clientSecret = new URLSearchParams(window.location.search).get('payment_intent_client_secret') || null;

export const stripeOptions: StripeElementsOptions = clientSecret
  ? { clientSecret }
  : {
      mode: 'payment',
      amount: 123,
      currency: 'usd',
    };
