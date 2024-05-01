import { getCardsService } from "../services/getCards.js";

export const getCards = async (req, res) => {
  try {
    const data = req.body;

    const cards = await getCardsService(data);

    res.status(200).json(cards);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};
