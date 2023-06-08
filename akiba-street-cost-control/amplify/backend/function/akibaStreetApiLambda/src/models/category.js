"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var categorySchema = mongoose_1["default"].model("Category", new mongoose_1.Schema({
    name: { type: String, trim: true },
    created_at: { type: Date, "default": Date.now },
    updated_at: { type: Date, "default": Date.now }
}));
// categorySchema.schema.plugin(mongoosePaginate);
exports["default"] = categorySchema;
