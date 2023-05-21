import type { BackgroundHandler, HandlerEvent } from '@netlify/functions';
import dotenv from 'dotenv';

dotenv.config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export const handler: BackgroundHandler = async (event: HandlerEvent) => {
  console.log('event', event);
  try {
    const { amount, currency } = JSON.parse(event.body);
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ paymentIntent }),
    };
  } catch (error) {
    console.log({ error });

    return {
      status: 400,
      body: JSON.stringify({ error }),
    };
  }
};
