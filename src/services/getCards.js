import { CardModel } from "../models/card.model.js";

export const getCardsService = async (id) => {
  try {
    if (!id) {
      throw new Error("User ID is required");
    }

    const cards = await CardModel.find({})
      .where("userId")
      .equals(id)
      .exec();

    return cards;
  } catch (error) {
    console.log(error);
    throw new Error("Database update error");
  }
};
