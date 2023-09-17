import mongoose, { Document, Schema } from "mongoose";
import { mongoosePagination, Pagination } from "mongoose-paginate-ts";

export interface IProduct {
  name: string;
  description: string;
  purchasePrice: number;
  customerPrice: number;
  stock: number;
  sold: number;
  image: string;
  category: mongoose.Schema.Types.ObjectId;
  subcategory: string;
  created_at: Date;
  updated_at: Date;
}

export interface IProductModel extends IProduct, Document {}

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  purchasePrice: {
    type: Number,
    required: true,
  },
  customerPrice: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  sold: {
    type: Number,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  subcategory: {
    type: String,
  },
  image: {
    type: String,
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
});

schema.plugin(mongoosePagination);

const productSchema: Pagination<IProductModel> = mongoose.model<
  IProductModel,
  Pagination<any>
>("Product", schema);

export default productSchema;
