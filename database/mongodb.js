import mongoose from "mongoose";
import { NODE_ENV, DB_URI } from "../config/env.js";

if (!DB_URI) {
  throw new Error(
    `Please add DB_URI as environment variable in env.${NODE_ENV}.local`
  );
}
const connectToDatabse = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log(`connected to databse in ${NODE_ENV}`);
  } catch (err) {
    console.error("Error connecting to database", err);
  }
};
export default connectToDatabse;
