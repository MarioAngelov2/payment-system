import dotenv from "dotenv";
import { UserModel } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
dotenv.config();

const secret = process.env.JWT_SECRET;

export const loginService = async (data) => {
  try {
    const { email, password } = data;

    const user = await UserModel.findOne({ email }).exec();

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        const token = jwt.sign({ email: user.email, id: user._id }, secret, {
          expiresIn: "7d",
        });

        return token;
      }
    }
  } catch (error) {
    console.log(error);
    throw new Error("Database update error");
  }
};
