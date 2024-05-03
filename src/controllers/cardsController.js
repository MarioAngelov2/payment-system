import {
  getCardsService,
  createCardService,
  deleteCardService,
} from "../services/cardsService.js";

export const createCard = async (req, res) => {
  try {
    const { cardNumber, cardHolder, expirationDate, userId } = req.body;

    const newCard = await createCardService({
      cardNumber,
      cardHolder,
      expirationDate,
      userId,
    });

    res.status(201).json(newCard);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

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

export const deleteCard = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await deleteCardService(id);

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};
