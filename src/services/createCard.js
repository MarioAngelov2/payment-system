import dotenv from "dotenv";
import { CardModel } from "../models/card.model.js";
import crypto, { createCipheriv } from "crypto";

dotenv.config();

const key = Buffer.from(process.env.ENCRYPTION_SECRET_KEY, "hex");
const iv = crypto.randomBytes(16);

const encryptCard = (number) => {
  const cipher = createCipheriv("aes-256-cbc", Buffer.from(key), iv);
  let encryptedData = cipher.update(number, "utf-8", "hex");
  encryptedData += cipher.final("hex");

  return { encryptedData, iv: iv.toString("hex") };
};

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
