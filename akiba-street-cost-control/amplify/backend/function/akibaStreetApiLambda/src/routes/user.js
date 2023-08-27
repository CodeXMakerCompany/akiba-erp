"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var user_controller_1 = require("../controllers/user/user.controller");
var router = express.Router();
router.post("/login", user_controller_1.login);
router.post("/register", user_controller_1.register);
exports.default = router;
