import { CardModel } from "../models/card.model.js";
import { encryptCard } from "../utils/encryptCard.js";

export const createCardService = async (cardData) => {
  try {
    const { cardNumber, cardHolder, expirationDate, userId } = cardData;

    if (cardNumber.length !== 9) {
      throw new Error("Card number should be 9 digits long");
    }
 
    const userCards = await CardModel.find({ userId }).exec();

    if (userCards.length >= 5) {
      throw new Error("User can have only 5 cards");
    }

    const { encryptedData, iv } = encryptCard(cardNumber);

    const newCard = new CardModel({
      cardNumber: encryptedData,
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

export const deleteCardService = async (id) => {
  try {

    if (!id) {
      throw new Error("Card ID is required");
    }

    await CardModel.findByIdAndDelete(id).exec();

    return "Card deleted";
  } catch (error) {
    console.log(error);
    throw new Error("Database update error");
  }
};

export const getCardsService = async (id) => {
  try {
    if (!id) {
      throw new Error("User ID is required");
    }

    const cards = await CardModel.find({})
      .where("userId")
      .equals(id)
      .exec();

    return cards;
  } catch (error) {
    console.log(error);
    throw new Error("Database update error");
  }
};