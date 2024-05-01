import { registerService } from "../services/register.js";

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