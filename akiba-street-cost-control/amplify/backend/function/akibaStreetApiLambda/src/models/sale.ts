import mongoose, { Document, Schema } from "mongoose";

import { mongoosePagination, Pagination } from "mongoose-paginate-ts";

export interface IProduct {
  id: string;
  qty: string;
  our_purchase_price: number;
}

export interface ISale {
  products: Array<IProduct>;
  total: number;
  net_earning: number;
  customer: string;
  payment_method: string;
  created_at: Date;
  updated_at: Date;
}

export interface ISaleModel extends ISale, Document {}

const schema = new Schema({
  total: {
    type: Number,
    required: true,
  },
  products: {
    type: Array,
    required: true,
  },
  net_earning: {
    type: Number,
    required: true,
  },
  customer: {
    type: String,
    required: true,
  },
  payment_method: {
    type: String,
    required: true,
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

schema.plugin(mongoosePagination);

const saleSchema: Pagination<ISaleModel> = mongoose.model<
  ISaleModel,
  Pagination<any>
>("Sale", schema);

export default saleSchema;
