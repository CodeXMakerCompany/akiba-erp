"use strict";
exports.__esModule = true;
var express = require("express");
var category_controller_1 = require("../controllers/category.controller");
var router = express.Router();
router.get("/all", category_controller_1["default"].getCategories);
router.post("/create", category_controller_1["default"].createCategory);
exports["default"] = router;
