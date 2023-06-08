"use strict";
exports.__esModule = true;
var express_1 = require("express");
var category_controller_1 = require("../controllers/category.controller");
var router = express_1["default"].Router();
router.get("/all", category_controller_1["default"].getCategories);
router.post("/create", category_controller_1["default"].createCategory);
exports["default"] = router;
