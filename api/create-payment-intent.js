require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const { amount } = req.body;

  try {
    const paymentRequest = stripe.paymentRequest({
  country: 'US',                // ✅ Must be US or supported
  currency: 'usd',
  total: {
    label: 'Test Payment',
    amount: 1000,               // $10
  },
  requestPayerName: true,
  requestPayerEmail: true,
});
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
