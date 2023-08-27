"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var eventSchema = mongoose_1.default.model("Event", new mongoose_1.Schema({
    name: { type: String, trim: true },
    priority: { type: String, trim: true },
    recurrency: { type: String, trim: true },
    active: { type: Boolean, trim: true, default: true },
    created_at: { type: Date },
    updated_at: { type: Date, default: Date.now },
}));
exports.default = eventSchema;
