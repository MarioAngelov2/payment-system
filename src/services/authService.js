import { UserModel } from "../models/user.model.js";
import {
  registerValidation,
  loginValidation,
} from "../middleware/authValidation.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { parse } from "date-fns";

dotenv.config();

const secret = process.env.JWT_SECRET;

export const registerService = async (data) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      address,
      phoneNumber,
      birthDate,
      balance,
    } = data;

    const dateFormat = "dd.MM.yyyy";
    const parsedDate = parse(birthDate, dateFormat, new Date());

    if (parsedDate.toString() === "Invalid Date") {
      throw new Error("Invalid date format");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { error } = registerValidation.validate(data);
    if (error) {
      throw new Error(error.details[0].message);
    }

    const newUser = new UserModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      address,
      phoneNumber,
      birthDate: parsedDate,
      balance,
    });

    const user = await newUser.save();

    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Database update error");
  }
};

export const loginService = async (data) => {
  try {
    const { email, password } = data;

    const { error } = loginValidation.validate(data);
    if (error) {
      throw new Error(error.details[0].message);
    }

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
