import { CardModel } from '../models/card.model.js'

export const getCardsService = async (data) => {
  try {
    const { userId } = data;

    if (!userId) {
      throw new Error('User ID is required')
    }

    const cards = await CardModel.find({ userId }).exec();

    return cards;
  } catch (error) {
    console.log(error)
    throw new Error('Database update error')
  }
}