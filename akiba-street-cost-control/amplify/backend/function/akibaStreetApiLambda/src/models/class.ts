import mongoose, { Document } from "mongoose";
import { mongoosePagination } from "mongoose-paginate-ts";

export interface IClass {
  name: string;
  categoryId: mongoose.Schema.Types.ObjectId;
  created_at: Date;
  updated_at: Date;
}

export interface IClassModel extends IClass, Document {}

const classSchema = mongoose.model<IClass>(
  "Class",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
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

classSchema.schema.plugin(mongoosePagination);

export default classSchema;
