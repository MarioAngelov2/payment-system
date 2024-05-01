import { transactionService } from "../services/transaction.js";

export const transaction = async (req, res) => {
  try {
    const { senderId, receiverId, amount, cardNumber, cardId } = req.body;

    const transaction = await transactionService(
      senderId,
      receiverId,
      amount,
      cardNumber,
      cardId
    );

    res.status(201).json(transaction);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};
