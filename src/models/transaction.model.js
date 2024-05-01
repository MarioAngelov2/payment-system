import mongoose from "mongoose";
const { Schema, model } = mongoose;

const transactionSchema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: "User" },
  receiver: { type: Schema.Types.ObjectId, ref: "User" },
  amount: Number,
  date: { type: Date, default: Date.now },
});

export const TransactionModel = model("Transaction", transactionSchema);
