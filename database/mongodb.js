import mongoose from "mongoose";

import { DB_URI, NODE_ENV } from "../config/env.js";

if (!DB_URI) {
  throw Error(
    "Please define the MONGODB_URI environment variable inside .env.<development|production>.local"
  );
}

const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log(`connected to database in in ${NODE_ENV} mode`);
  } catch (error) {
    console.log("Error connecting to database: ", error);
    process.exit(1);
  }
};
export default connectToDatabase;
