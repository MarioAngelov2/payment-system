import { CardModel } from "../models/card.model.js";
import { encryptCard } from "../utils/encryptCard.js";
import {
  createCardValidation,
  deleteCardValidation,
  getCardsValidation,
} from "../middleware/cardValidation.js";
import { parse } from "date-fns";

export const createCardService = async (cardData) => {
  try {
    const { cardNumber, cardHolder, expirationDate, userId } = cardData;

    const { error } = createCardValidation.validate(cardData);
    if (error) {
      throw new Error(error.details[0].message);
    }

    if (!/^\d+$/.test(cardNumber)) {
      throw new Error("Card number should contain only digits");
    }

    const dateFormat = "MM/yy";
    const parsedDate = parse(expirationDate, dateFormat, new Date());

    if (parsedDate.toString() === "Invalid Date") {
      throw new Error("Invalid date format");
    }

    if (parsedDate < new Date()) {
      throw new Error("Card expired");
    }

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
      expirationDate: parsedDate,
      userId,
      encryptionIV: iv,
    });

    const savedCard = await newCard.save();

    return savedCard;
  } catch (error) {
    console.log(error);
    throw new Error("Database update error");
  }
};

export const deleteCardService = async (id) => {
  try {
    const { error } = deleteCardValidation.validate({ id });
    if (error) {
      throw new Error(error.details[0].message);
    }

    await CardModel.findByIdAndDelete(id);

    return "Card deleted";
  } catch (error) {
    console.log(error);
    throw new Error("Database update error");
  }
};

export const getCardsService = async (id) => {
  try {
    const { error } = getCardsValidation.validate({ id });
    if (error) {
      throw new Error(error.details[0].message);
    }

    const cards = await CardModel.find({}).where("userId").equals(id).exec();

    return cards;
  } catch (error) {
    console.log(error);
    throw new Error("Database update error");
  }
};
