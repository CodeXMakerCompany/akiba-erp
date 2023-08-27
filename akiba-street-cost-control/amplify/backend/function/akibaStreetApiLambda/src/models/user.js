"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var mongoose_paginate_ts_1 = require("mongoose-paginate-ts");
var schema = new mongoose_1.Schema({
    name: { type: String, trim: true },
    surnames: { type: String, trim: true },
    email: { type: String, trim: true },
    password: { type: String, trim: true },
    phone: { type: String, trim: true },
    address: { type: Object },
    rol: { type: String, trim: true },
    description: { type: String, trim: true },
    status: Number,
    avatar: { type: String, trim: true },
    updated_at: { type: Date, default: Date.now() },
    created_at: { type: Date, default: new Date() },
});
schema.plugin(mongoose_paginate_ts_1.mongoosePagination);
var userSchema = mongoose_1.default.model("User", schema);
exports.default = userSchema;
