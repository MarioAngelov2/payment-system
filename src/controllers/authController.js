import { UserModel } from "../models/user.model.js";
import {registerService, loginService} from '../services/authService.js'

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

export const login = async (req, res) => {
  try {
    const data = req.body;

    const token = await loginService(data);

    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
  }
};
