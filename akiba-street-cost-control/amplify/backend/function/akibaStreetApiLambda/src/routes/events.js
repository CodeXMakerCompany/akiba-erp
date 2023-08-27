"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var event_controller_1 = require("../controllers/event.controller");
var router = express.Router();
router.get("/all", event_controller_1.default.getEvents);
router.post("/create", event_controller_1.default.createEvent);
exports.default = router;
