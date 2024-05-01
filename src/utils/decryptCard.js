import dotenv from "dotenv";
import crypto from "crypto";
dotenv.config();

const key = Buffer.from(process.env.ENCRYPTION_SECRET_KEY, "hex");

export const decryptCard = async (cardEncryptionIV, cardNumber) => {

  console.log("cardEncryptionIV", cardEncryptionIV);
  console.log("cardNumber", cardNumber);

  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(key),
    Buffer.from(cardEncryptionIV, "hex")
  );
  let decryptedCardNumber = decipher.update(cardNumber, "hex", "utf-8");
  decryptedCardNumber += decipher.final("utf-8");

  return decryptedCardNumber;
};
