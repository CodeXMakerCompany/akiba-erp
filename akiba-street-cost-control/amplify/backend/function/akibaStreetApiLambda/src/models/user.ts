// import { model, Schema, Model, Document } from "mongoose";

// interface IUser extends Document {
//   email: string;
//   firstName: string;
//   lastName: string;
//   nickname: string;
// }

// const linksSchema: Schema = new Schema({
//   name: { type: String, required: true },
//   link: { type: String, required: true },
// });

// const followersSchema: Schema = new Schema({
//   username: { type: String, required: true },
//   email: { type: String, required: true },
// });

// const UserSchema: Schema = new Schema({
//   email: { type: String, required: true },
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   avatarImg: { type: String, required: true },
//   links: [linksSchema],
//   createdAd: { type: Date, default: new Date() },
// });

// export const User: Model<IUser> = model("User", UserSchema);

export default "testing";
