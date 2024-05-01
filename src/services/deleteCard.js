import { CardModel } from "../models/card.model.js";

export const deleteCardService = async (id) => {
  try {

    if (!id) {
      throw new Error("Card ID is required");
    }

    await CardModel.findByIdAndDelete(id).exec();

    return "Card deleted";
  } catch (error) {
    console.log(error);
    throw new Error("Database update error");
  }
};
