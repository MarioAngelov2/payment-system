import { TransactionModel } from "../models/transaction.model.js";

export const getTransactionsService = async (userId) => {
  try {

    if (!userId) {
      throw new Error("User not found");
    }

    const transactions = await TransactionModel.find({
      $or: [{ sender: userId }, { receiver: userId }],
    }).sort({ createdAt: -1 });

    if (!transactions) {
      throw new Error("Transactions not found");
    }

    return transactions;
  } catch (error) {
    console.log(error);
    throw new Error("Database update error");
  }
};
