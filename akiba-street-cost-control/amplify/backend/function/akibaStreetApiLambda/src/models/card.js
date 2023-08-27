"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var mongoose_paginate_ts_1 = require("mongoose-paginate-ts");
var ObjectId = mongoose_1.default.Schema.Types.ObjectId;
var imagesSchema = new mongoose_1.Schema({
    image: { type: String, trim: true },
    mode: { type: String, trim: true },
});
mongoose_1.default.model("CardImages", imagesSchema);
var pricesSchema = new mongoose_1.Schema({
    buyPrice: { type: String, trim: true },
    sellPrice: { type: String, trim: true },
    mode: { type: String, trim: true },
    currency: { type: String, trim: true },
});
mongoose_1.default.model("CardPrices", pricesSchema);
var schema = new mongoose_1.Schema({
    title: { type: String },
    category_id: { type: ObjectId, ref: "Category" },
    set_name: { type: String, trim: true },
    stock: Number,
    sold: Number,
    images: [imagesSchema],
    specs: { type: Object },
    prices: [pricesSchema],
    description: { type: String },
    product_type: { type: String, trim: true },
    JPN_card_no: { type: String, trim: true },
    card_no: { type: String, trim: true },
    name: { type: String, trim: true },
    color: { type: String, trim: true },
    card_type: { type: String, trim: true },
    rarity: { type: String, trim: true },
    cost: { type: String, trim: true },
    level: { type: String, trim: true },
    limits: { type: String, trim: true },
    master: { type: String, trim: true },
    LRIG_SIGNI_type: { type: String, trim: true },
    guard_coin_timing: { type: String, trim: true },
    grow_cost: { type: String, trim: true },
    power: { type: String, trim: true },
    content: { type: String, trim: true },
    power_text: { type: String, trim: true },
    fllabor_text: { type: String, trim: true },
    artist: { type: String, trim: true },
    flg: { type: String, trim: true },
    sdate: { type: String, trim: true },
    image: { type: String, trim: true },
    tcg: { type: String, trim: true },
    special_note: { type: String, trim: true },
    created_at: { type: Date },
});
schema.plugin(mongoose_paginate_ts_1.mongoosePagination);
var cardSchema = mongoose_1.default.model("Card", schema);
exports.default = cardSchema;
