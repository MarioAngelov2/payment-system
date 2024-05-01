import dotenv from "dotenv";
import crypto from "crypto";
dotenv.config();

const key = Buffer.from(process.env.ENCRYPTION_SECRET_KEY, "hex");
const iv = crypto.randomBytes(16);

export const encryptCard = (number) => {
  const cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(key), iv);
  let encryptedData = cipher.update(number, "utf-8", "hex");
  encryptedData += cipher.final("hex");

  return { encryptedData, iv: iv.toString("hex") };
};