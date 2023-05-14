import mongoose, { Document } from "mongoose";
import { mongoosePagination, Pagination } from "mongoose-paginate-ts";

export interface IProduct {
  name: string;
  description: string;
  purchasePrice: number;
  customerPrice: number;
  stock: number;
  image: string;
  category: mongoose.Schema.Types.ObjectId;
  created_at: Date;
  updated_at: Date;
}

export interface IProductModel extends IProduct, Document {}

const productSchema = mongoose.model<IProduct>(
  "Product",
  new mongoose.Schema({
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
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
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
  })
);

productSchema.schema.plugin(mongoosePagination);

export default productSchema;
