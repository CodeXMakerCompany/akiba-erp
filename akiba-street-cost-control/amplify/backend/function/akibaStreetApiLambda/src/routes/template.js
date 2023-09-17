"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var template_controller_1 = require("../controllers/template/template.controller");
var router = express.Router();
router.get("/get/:name", template_controller_1.getByName);
router.post("/create", template_controller_1.create);
router.put("/update", template_controller_1.update);
exports.default = router;
