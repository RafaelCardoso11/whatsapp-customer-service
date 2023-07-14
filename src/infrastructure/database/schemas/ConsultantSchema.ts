import mongoose from "mongoose";

export const ConsultantModel = mongoose.model(
  "Consultants",
  new mongoose.Schema({
    name: {
      type: "string",
      required: true,
    },
    number: {
      type: "string",
      required: true,
    },
    clientCurrent: {
      name: { type: "string", required: true },
      number: { type: "string", required: true },
    },
  })
);