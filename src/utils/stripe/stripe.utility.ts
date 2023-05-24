import { loadStripe, type StripeElementsOptions } from '@stripe/stripe-js';

const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

export const stripePromise = loadStripe(stripePublishableKey);

export const stripeOptions: StripeElementsOptions = {
  mode: 'payment',
  amount: 123,
  currency: 'usd',
};
