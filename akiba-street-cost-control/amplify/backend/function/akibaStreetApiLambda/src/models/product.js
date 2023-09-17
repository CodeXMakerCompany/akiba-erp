"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var mongoose_paginate_ts_1 = require("mongoose-paginate-ts");
var schema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    purchasePrice: {
        type: Number,
        required: true,
    },
    customerPrice: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    sold: {
        type: Number,
    },
    category: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Category",
    },
    subcategory: {
        type: String,
    },
    image: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
});
schema.plugin(mongoose_paginate_ts_1.mongoosePagination);
var productSchema = mongoose_1.default.model("Product", schema);
exports.default = productSchema;
