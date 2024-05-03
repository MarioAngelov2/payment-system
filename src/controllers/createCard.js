import { createCardService } from "../services/createCard.js";

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
