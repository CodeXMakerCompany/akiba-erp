import * as express from "express";
import { makePaymentIntent } from "../controllers/payment/payment.controller";
const router = express.Router();

router.post("/stripe-intent", makePaymentIntent);

export default router;
