import { connect } from "mongoose";
import logger from "../../utils/logger";
export default async () => {
  try {
    const connection = await connect(
      `mongodb+srv://codexmaker:${process.env.DB_PASS}@cluster0.wyr6c0u.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
    );

    logger("success", "Connected to database successfully");
  } catch (error: any) {
    console.error("An error ocurred:", error?.message);
  }
};
