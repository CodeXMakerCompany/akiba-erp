import mongoose, { Document, Schema } from "mongoose";

import mongoosePaginate from "mongoose-paginate-ts";

export interface ICategory {
  name: string;
  created_at: Date;
  updated_at: Date;
}

export interface ICategoryModel extends ICategory, Document {}

const categorySchema = mongoose.model<ICategory>(
  "Category",
  new Schema({
    name: { type: String, trim: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  })
);

// categorySchema.schema.plugin(mongoosePaginate);

export default categorySchema;
