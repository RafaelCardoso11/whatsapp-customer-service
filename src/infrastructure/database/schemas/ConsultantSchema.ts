import mongoose, { Schema } from "mongoose";

export const ConsultantModel = mongoose.model(
  "Consultants",
  new mongoose.Schema({
    _id: { type: Schema.Types.ObjectId, auto: true },
    name: {
      type: "string",
      required: true,
    },
    number: {
      type: "string",
      required: true,
    },
    clientCurrent: {
      _id: { type: "string", required: false, default: "" },
      name: { type: "string", required: false, default: "" },
      number: { type: "string", required: false, default: "" },
    },
  })
);
