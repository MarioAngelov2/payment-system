import { CardModel } from "../models/card.model.js";
import { encryptCard } from "../utils/encryptCard.js";

export const createCardService = async (cardData) => {
  try {
    const { number, cardHolder, expirationDate, userId } = cardData;

    const { encryptedData, iv } = encryptCard(number);

    const newCard = new CardModel({
      number: encryptedData,
      cardHolder,
      expirationDate,
      userId,
      encryptionIV: iv,
    });

    await newCard.save();

    return newCard;
  } catch (error) {
    console.log(error);
    throw new Error("Database update error");
  }
};
