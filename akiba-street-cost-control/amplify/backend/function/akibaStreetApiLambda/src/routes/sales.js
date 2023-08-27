"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var sale_controller_1 = require("../controllers/sale.controller");
var router = express.Router();
router.post("/create", sale_controller_1.default.createSale);
router.post("/all", sale_controller_1.default.getSales);
exports.default = router;
