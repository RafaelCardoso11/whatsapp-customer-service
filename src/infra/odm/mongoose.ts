import mongoose from "mongoose";

export async function connectToDatabase(
  uri: string,
  options?: mongoose.ConnectOptions
) {
  try {
    await mongoose.connect(uri, options);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
}

export default connectToDatabase;
