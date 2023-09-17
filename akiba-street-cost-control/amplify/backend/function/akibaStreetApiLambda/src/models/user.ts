import mongoose, { Document, Schema } from "mongoose";

import { mongoosePagination, Pagination } from "mongoose-paginate-ts";

export interface IUserAddress {
  country: string;
  city: string;
  postalCode: string;
  street: string;
  notes: string;
}
export interface IUser {
  name: String;
  surnames: String;
  email: String;
  loginProvider: String;
  password: String;
  phone: String;
  city: String;
  country: String;
  address: IUserAddress;
  rol: String;
  description: String;
  status: Number;
  avatar: String;
  created_at: String;
  updated_at: String;
}

export interface IUserModel extends IUser, Document {}

const schema = new Schema({
  name: { type: String, trim: true },
  surnames: { type: String, trim: true },
  email: { type: String, trim: true },
  loginProvider: { type: String, trim: true },
  password: { type: String, trim: true },
  phone: { type: String, trim: true },
  city: { type: String, trim: true },
  country: { type: String, trim: true },
  address: { type: Object },
  rol: { type: String, trim: true },
  description: { type: String, trim: true },
  status: Number,
  avatar: { type: String, trim: true },
  updated_at: { type: Date, default: Date.now() },
  created_at: { type: Date, default: new Date() },
});

schema.plugin(mongoosePagination);

const userSchema: Pagination<IUserModel> = mongoose.model<
  IUserModel,
  Pagination<any>
>("User", schema);

export default userSchema;
