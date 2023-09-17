"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var payment_controller_1 = require("../controllers/payment/payment.controller");
var router = express.Router();
router.post("/stripe-intent", payment_controller_1.makePaymentIntent);
exports.default = router;
