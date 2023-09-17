"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var mongoose_paginate_ts_1 = require("mongoose-paginate-ts");
var schema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    mainBanner: {
        type: String,
    },
    bannerSliderImages: {
        type: Array,
    },
    topProductsImage: {
        type: String,
    },
    latestSetsImages: {
        type: Array,
    },
    offersImages: {
        type: Array,
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});
schema.plugin(mongoose_paginate_ts_1.mongoosePagination);
var saleSchema = mongoose_1.default.model("Template", schema);
exports.default = saleSchema;
