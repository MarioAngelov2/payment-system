import { depositService } from "../services/deposit.js";

export const deposit = async (req, res) => {
  try {
    const { id, amount, cardNumber } = req.body;

    const deposit = await depositService(id, amount, cardNumber);

    res.status(201).json(deposit);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};
