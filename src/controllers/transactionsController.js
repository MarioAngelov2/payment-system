import {
  transactionService,
  getTransactionsService,
  depositService,
} from "../services/transactionsService.js";

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

export const getTransactions = async (req, res) => {
  try {
    const { userId } = req.params;

    const transactions = await getTransactionsService(userId);

    res.status(200).json(transactions);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};
