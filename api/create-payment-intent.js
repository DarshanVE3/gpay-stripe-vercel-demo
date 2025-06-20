require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const { amount } = req.body;

  try {
    const paymentIntent = stripe.paymentRequest({
  country: 'US',
  currency: 'usd',
  total: {
    label: 'Total',
    amount: 1000,
  },
  requestPayerName: true,
  requestPayerEmail: true,
  supportedPaymentMethods: [
    {
      supportedMethods: 'google_pay',
      data: {
        environment: 'TEST',
        apiVersion: 2,
        apiVersionMinor: 0,
        allowedPaymentMethods: ['CARD', 'TOKENIZED_CARD'],
        merchantInfo: {
          merchantName: 'Demo Merchant',
        },
        allowedCardNetworks: ['VISA', 'MASTERCARD'],
        allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
        billingAddressRequired: true,
        billingAddressParameters: {
          format: 'FULL',
        },
      },
    },
  ]
});
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
