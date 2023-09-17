import mongoose, { Document, Schema } from "mongoose";

import { mongoosePagination, Pagination } from "mongoose-paginate-ts";

export interface ITemplate {
  name: string;
  mainBanner: string;
  bannerSliderImages: string[];
  topProductsImage: string;
  latestSetsImages: string[];
  offersImages: string[];
  created_at: Date;
  updated_at: Date;
}

export interface ITemplateModel extends ITemplate, Document {}

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  mainBanner: {
    type: String,
  },
  bannerSliderImages: {
    type: Array,
  },
  topProductsImage: {
    type: String,
  },
  latestSetsImages: {
    type: Array,
  },
  offersImages: {
    type: Array,
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

schema.plugin(mongoosePagination);

const saleSchema: Pagination<ITemplateModel> = mongoose.model<
  ITemplateModel,
  Pagination<any>
>("Template", schema);

export default saleSchema;
