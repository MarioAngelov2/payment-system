import { DepositModel } from "../models/deposit.model.js";
import { CardModel } from "../models/card.model.js";
import { UserModel } from "../models/user.model.js";
import { decryptCard } from "../utils/decryptCard.js";

export const depositService = async (id, amount, cardNumber) => {
  try {
    const card = await CardModel.findOne({ _id: id });

    if (!card) {
      throw new Error("Card not found.");
    }

    const decryptedCardNumber = await decryptCard(
      card.encryptionIV,
      card.number
    );

    if (decryptedCardNumber !== cardNumber) {
      console.log("Invalid card number");
    } else {
      const deposit = new DepositModel({
        cardId: id,
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
