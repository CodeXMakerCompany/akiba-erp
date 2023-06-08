import mongoose, { Document, Schema } from "mongoose";

export interface IEvent {
  name: string;
  priority: string;
  recurrency: string;
  active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface IEventModel extends IEvent, Document {}

const eventSchema = mongoose.model<IEvent>(
  "Event",
  new Schema({
    name: { type: String, trim: true },
    priority: { type: String, trim: true },
    recurrency: { type: String, trim: true },
    active: { type: Boolean, trim: true, default: true },
    created_at: { type: Date },
    updated_at: { type: Date, default: Date.now },
  })
);

export default eventSchema;
