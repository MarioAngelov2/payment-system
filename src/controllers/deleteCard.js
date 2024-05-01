import { deleteCardService } from "../services/deleteCard.js";

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
