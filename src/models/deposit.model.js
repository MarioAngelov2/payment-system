import mongoose from "mongoose";
const { Schema, model } = mongoose;

const depositSchema = new Schema({
  amount: Number,
  cardId: { type: Schema.Types.ObjectId, ref: "Card" },
  date: { type: Date, default: Date.now },
});

export const DepositModel = model("Deposit", depositSchema);
