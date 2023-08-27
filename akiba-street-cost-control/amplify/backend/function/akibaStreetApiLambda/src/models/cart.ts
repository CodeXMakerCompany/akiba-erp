import mongoose, { Document } from "mongoose";
import { mongoosePagination } from "mongoose-paginate-ts";
import { IProduct } from "./product";

export interface ICart {
  userId: mongoose.Schema.Types.ObjectId;
  products: Array<IProduct>;
  created_at: Date;
  updated_at: Date;
}

export interface ICartModel extends ICart, Document {}

const cartSchema = mongoose.model(
  "cart",
  new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    products: {
      type: Array,
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

cartSchema.schema.plugin(mongoosePagination);

export default cartSchema;
