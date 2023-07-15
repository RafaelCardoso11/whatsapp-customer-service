import mongoose, { Schema } from "mongoose";

const AttendimentSchema: Schema = new mongoose.Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  attendimentStars: { type: "number", required: true },
  avaliation: { type: "object", required: true },
  consultant: { type: "object", required: true },
  client: { type: "object", required: true },
  number: { type: "number", unique: true },
  date: { type: "date", required: true },
});

export const AttendimentModel = mongoose.model(
  "attendiments",
  AttendimentSchema
);

