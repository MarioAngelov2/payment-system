import mongoose from "mongoose";
const { Schema, model } = mongoose;

const cardSchema = new Schema({
  cardNumber: String,
  cardHolder: String,
  expirationDate: String,
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  encryptionIV: String,
});

export const CardModel = model("Card", cardSchema);
