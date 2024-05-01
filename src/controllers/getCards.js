import { getCardsService } from "../services/getCards.js";

export const getCards = async (req, res) => {
  try {
    const { id } = req.params;

    const cards = await getCardsService(id);

    res.status(200).json(cards);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};
