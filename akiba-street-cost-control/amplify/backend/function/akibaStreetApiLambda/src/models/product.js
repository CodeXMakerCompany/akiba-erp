"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var mongoose_paginate_ts_1 = require("mongoose-paginate-ts");
var productSchema = mongoose_1["default"].model("Product", new mongoose_1["default"].Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    purchasePrice: {
        type: Number,
        required: true
    },
    customerPrice: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose_1["default"].Schema.Types.ObjectId,
        ref: "Category"
    },
    image: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        "default": Date.now
    },
    updated_at: {
        type: Date,
        "default": Date.now
    }
}));
productSchema.schema.plugin(mongoose_paginate_ts_1.mongoosePagination);
exports["default"] = productSchema;
