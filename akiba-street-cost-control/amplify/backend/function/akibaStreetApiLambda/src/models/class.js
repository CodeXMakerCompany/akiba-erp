"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var mongoose_paginate_ts_1 = require("mongoose-paginate-ts");
var classSchema = mongoose_1.default.model("Class", new mongoose_1.default.Schema({
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
classSchema.schema.plugin(mongoose_paginate_ts_1.mongoosePagination);
exports.default = classSchema;
