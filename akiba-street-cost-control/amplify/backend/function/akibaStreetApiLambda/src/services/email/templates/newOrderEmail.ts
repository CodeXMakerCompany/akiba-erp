import * as dotenv from "dotenv";
import "dotenv/config";
import { NEW_ORDER_TEMPLATE_ID, SENDER_EMAIL } from "../constants";
dotenv.config();

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

interface Product {
  text: string;
  image: string;
  price: string;
  quantity: string;
}

interface newOrderEmailProps {
  orderId: string;
  email: string;
  amount: string;
  currency: string;
  products: Product[];
}

export const newOrderEmail = async ({
  orderId,
  email,
  amount,
  currency,
  products,
}: newOrderEmailProps) => {
  const now = new Date();
  const msg = {
    to: email, // Change to your recipient
    from: SENDER_EMAIL, // Change to your verified sender
    template_id: NEW_ORDER_TEMPLATE_ID,
    subject: "Thank you for your order!",
    dynamic_template_data: {
      orderId,
      email,
      amount,
      currency,
      date: now.toLocaleString(),
      products,
    },
  };
  const sendgridResponse = await sgMail.send(msg);
  if (sendgridResponse) {
    console.log(sendgridResponse);
  }
};
