import { DepositModel } from "../models/deposit.model.js";
import { CardModel } from "../models/card.model.js";
import { UserModel } from "../models/user.model.js";
import { decryptCard } from "../utils/decryptCard.js";

export const depositService = async (cardId, amount, cardNumber) => {
  try {
    const card = await CardModel.findOne({ _id: cardId });

    if (!card) {
      throw new Error("Card not found.");
    }

    const decryptedCardNumber = await decryptCard(
      card.encryptionIV,
      card.cardNumber
    );

    if (decryptedCardNumber !== cardNumber) {
      console.log("Invalid card number");
      throw new Error("Invalid card number.");
    } else {
      const deposit = new DepositModel({
        cardId,
        amount,
      });

      await deposit.save();

      await UserModel.findOneAndUpdate(
        { _id: card.userId },
        { $inc: { balance: amount } }
      );

      return deposit;
    }
  } catch (error) {
    console.log(error);
    throw new Error("Database error. Please try again.");
  }
};
