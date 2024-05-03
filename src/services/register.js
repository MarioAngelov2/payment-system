import { UserModel } from "../models/user.model.js";
import bcrypt from "bcrypt";
import { registerValidation } from "../middleware/registerValidation.js";

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
      birthDate,
      balance,
    });

    const user = await newUser.save();

    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Database update error");
  }
};
