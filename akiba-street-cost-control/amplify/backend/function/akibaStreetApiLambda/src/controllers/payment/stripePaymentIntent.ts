import * as dotenv from "dotenv";
import "dotenv/config";
dotenv.config();
import StripeInstance from "stripe";

const stripe = new StripeInstance(process.env.STRIPE_LIVE_KEY, {
  apiVersion: "2023-08-16",
});

export const makePaymentIntent = async (req, res) => {
  try {
    const { amount, currency } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: currency.toLowerCase(),
    });

    return res.status(200).send(paymentIntent.client_secret);
  } catch (error) {
    return res.status(500).json({ status: 500, message: error.message });
  }
};
