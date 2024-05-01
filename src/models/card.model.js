import mongoose from "mongoose";
const { Schema, model } = mongoose;

const cardSchema = new Schema({
  number: String,
  cardHolder: String,
  expirationDate: String,
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});

export const CardModel = model("Card", cardSchema);
