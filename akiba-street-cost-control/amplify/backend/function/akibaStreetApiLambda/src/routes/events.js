"use strict";
exports.__esModule = true;
var express_1 = require("express");
var event_controller_1 = require("../controllers/event.controller");
var router = express_1["default"].Router();
router.get("/all", event_controller_1["default"].getEvents);
router.post("/create", event_controller_1["default"].createEvent);
exports["default"] = router;
