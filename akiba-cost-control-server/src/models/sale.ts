import mongoose, { Document, Schema } from "mongoose";

import mongoosePaginate from "mongoose-paginate-v2";

interface IProduct {
  id: string;
  qty: string;
}

export interface ISale {
  products: Array<IProduct>;
  total: number;
  net_earning: number;
  customer: string;
  created_at: Date;
  updated_at: Date;
}

export interface ISaleModel extends ISale, Document {}

const saleSchema = mongoose.model<ISaleModel>(
  "Sale",
  new Schema({
    total: {
      type: Number,
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
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  })
);

saleSchema.schema.plugin(mongoosePaginate);

export default saleSchema;
