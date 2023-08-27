"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var mongoose_paginate_ts_1 = require("mongoose-paginate-ts");
var raritySchema = mongoose_1.default.model("Rarity", new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    categoryId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
}));
raritySchema.schema.plugin(mongoose_paginate_ts_1.mongoosePagination);
exports.default = raritySchema;
