import { TransactionModel } from "../models/transaction.model.js";
import { UserModel } from "../models/user.model.js";
import { CardModel } from "../models/card.model.js";
import { decryptCard } from "../utils/decryptCard.js";

export const transactionService = async (
  senderId,
  receiverId,
  amount,
  cardNumber,
  cardId
) => {
  try {
    const card = await CardModel.findOne({ _id: cardId });
    const user = await UserModel.findOne({ _id: senderId });

    if (!card) {
      throw new Error("Card not found.");
    }

    const isValidCard = await decryptCard(card.encryptionIV, card.cardNumber);

    if (isValidCard !== cardNumber) {
      throw new Error("Invalid card number");
    }

    if (amount > user.balance || amount <= 0) {
      throw new Error("Invalid amount");
    }

    const transaction = new TransactionModel({
      sender: senderId,
      receiver: receiverId,
      amount: amount,
    });

    await transaction.save();

    await UserModel.findOneAndUpdate(
      { _id: senderId },
      { $inc: { balance: -amount } }
    );
    await UserModel.findByIdAndUpdate(receiverId, {
      $inc: { balance: +amount },
    });

    return transaction;
  } catch (error) {
    console.log(error);
    throw new Error("Database update error");
  }
};
