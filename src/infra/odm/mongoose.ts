import mongoose from "mongoose";
import { logger } from "../logger/logger";

export async function connectToDatabase(
  uri: string,
  options?: mongoose.ConnectOptions
) {
  try {
    await mongoose.connect(uri, options);
    logger.info("Connected to MongoDB");
  } catch (error) {
    logger.error(error);
  }
}

export default connectToDatabase;
