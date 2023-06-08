"use strict";
exports.__esModule = true;
var express = require("express");
var product_controller_1 = require("../controllers/product.controller");
var router = express.Router();
router.get("/all", product_controller_1["default"].getProducts);
router.get("/search/:keyword", product_controller_1["default"].getProductsByKeyword);
router.post("/create", product_controller_1["default"].createProduct);
exports["default"] = router;
