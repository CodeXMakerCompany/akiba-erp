"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var mongoose_paginate_ts_1 = require("mongoose-paginate-ts");
var ObjectId = mongoose_1.default.Schema.Types.ObjectId;
var schema = new mongoose_1.Schema({
    customer: {
        type: String,
        required: true,
    },
    customer_id: { type: ObjectId, ref: "User" },
    products: {
        type: Array,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        required: true,
    },
    net_earning: {
        type: Number,
        required: true,
    },
    payment_method: {
        type: String,
        required: true,
    },
    shipping_method: {
        type: String,
        required: true,
    },
    shipping_status: {
        type: String,
        required: true,
    },
    payment_currency: {
        type: String,
        required: true,
    },
    payment_reference: {
        type: String,
        required: true,
    },
    address: { type: Object },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});
schema.plugin(mongoose_paginate_ts_1.mongoosePagination);
var saleSchema = mongoose_1.default.model("Sale", schema);
exports.default = saleSchema;
