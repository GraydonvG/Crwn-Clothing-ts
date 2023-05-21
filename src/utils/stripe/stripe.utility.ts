import { loadStripe } from '@stripe/stripe-js';

const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

export const stripePromise = loadStripe(stripePublishableKey);

// type StripeOptionTypes = {
//   mode: string;
//   currency: string;
//   amount: number;
// };

// export const stripeOptions: StripeOptionTypes = {
//   mode: 'payment',
//   currency: 'usd',
//   amount: 1234,
// };
