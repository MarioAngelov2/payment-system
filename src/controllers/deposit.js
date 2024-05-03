import { depositService } from "../services/deposit.js";

export const deposit = async (req, res) => {
  try {
    const { cardId, amount, cardNumber } = req.body;

    const deposit = await depositService(cardId, amount, cardNumber);

    res.status(201).json(deposit);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};
