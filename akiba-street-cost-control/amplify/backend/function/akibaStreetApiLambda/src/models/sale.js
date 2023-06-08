"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var mongoose_paginate_ts_1 = require("mongoose-paginate-ts");
var schema = new mongoose_1.Schema({
    total: {
        type: Number,
        required: true
    },
    products: {
        type: Array,
        required: true
    },
    net_earning: {
        type: Number,
        required: true
    },
    customer: {
        type: String,
        required: true
    },
    payment_method: {
        type: String,
        required: true
    },
    created_at: { type: Date, "default": Date.now },
    updated_at: { type: Date, "default": Date.now }
});
schema.plugin(mongoose_paginate_ts_1.mongoosePagination);
var saleSchema = mongoose_1["default"].model("Sale", schema);
exports["default"] = saleSchema;
