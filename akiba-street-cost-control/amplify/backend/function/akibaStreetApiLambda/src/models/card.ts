import mongoose, { Document, Schema } from "mongoose";

import { mongoosePagination, Pagination } from "mongoose-paginate-ts";

export interface IImage {
  image: string;
  mode: string;
}

export interface IPrice {
  buyPrice: string;
  sellPrice: string;
  mode: string;
  currency: string;
}

export interface ICard {
  title: string;
  category_id: string;
  set_name: string;
  stock: number;
  sold: number;
  images: IImage[];
  specs: Object;
  prices: IPrice[];
  description: string;
  product_type: string;
  JPN_card_no: string;
  card_no: string;
  name: string;
  color: string;
  card_type: string;
  rarity: string;
  cost: string;
  level: string;
  limits: string;
  master: string;
  LRIG_SIGNI_type: string;
  guard_coin_timing: string;
  grow_cost: string;
  power: string;
  content: string;
  power_text: string;
  fllabor_text: string;
  artist: string;
  flg: string;
  sdate: string;
  image: string;
  tcg: string;
  special_note: string;
  created_at: Date;
}

export interface ICardModel extends ICard, Document {}

const ObjectId = mongoose.Schema.Types.ObjectId;
const imagesSchema = new Schema({
  image: { type: String, trim: true },
  mode: { type: String, trim: true },
});

mongoose.model("CardImages", imagesSchema);

const pricesSchema = new Schema({
  buyPrice: { type: String, trim: true },
  sellPrice: { type: String, trim: true },
  mode: { type: String, trim: true },
  currency: { type: String, trim: true },
});

mongoose.model("CardPrices", pricesSchema);

const schema = new Schema({
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

schema.plugin(mongoosePagination);

const cardSchema: Pagination<ICardModel> = mongoose.model<
  ICardModel,
  Pagination<any>
>("Card", schema);

export default cardSchema;
