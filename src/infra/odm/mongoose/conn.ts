import mongoose from "mongoose";

export async function main() {
  try {
    await mongoose.connect("mongodb://localhost/");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
}


