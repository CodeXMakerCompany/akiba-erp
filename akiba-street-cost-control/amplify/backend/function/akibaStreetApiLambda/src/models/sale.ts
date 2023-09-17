import mongoose, { Document, Schema } from "mongoose";

import { mongoosePagination, Pagination } from "mongoose-paginate-ts";
import { IUserAddress } from "./user";
const ObjectId = mongoose.Schema.Types.ObjectId;

export interface IProduct {
  id: string;
  qty: string;
  our_purchase_price: number;
}

export interface ISale {
  customer: string;
  customer_id: string;
  products: Array<IProduct>;
  total: number;
  discount: number;
  net_earning: number;
  payment_method: string;
  shipping_method: string;
  shipping_status: string;
  payment_currency: string;
  payment_reference: string;
  address: IUserAddress;
  created_at: Date;
  updated_at: Date;
}

export interface ISaleModel extends ISale, Document {}

const schema = new Schema({
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

schema.plugin(mongoosePagination);

const saleSchema: Pagination<ISaleModel> = mongoose.model<
  ISaleModel,
  Pagination<any>
>("Sale", schema);

export default saleSchema;
