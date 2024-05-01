import { registerService } from "../services/register.js";
import { UserModel } from "../models/user.model.js";

export const register = async (req, res) => {
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
    } = req.body;

    const user = await UserModel.findOne({ email }).exec();

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const result = await registerService({
      firstName,
      lastName,
      email,
      password,
      address,
      phoneNumber,
      birthDate,
      balance,
    });

    res.status(201).json(result);
  } catch (error) {
    console.log(error);
  }
};
