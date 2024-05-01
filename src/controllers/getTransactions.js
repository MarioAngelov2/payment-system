import { getTransactionsService } from "../services/getTransactions.js";

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
