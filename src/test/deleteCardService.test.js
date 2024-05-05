import { expect } from "chai";
import sinon from "sinon";
import { deleteCardService } from "../services/cardsService.js";
import { CardModel } from "../models/card.model.js";

describe("deleteCardService", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should delete a card successfully", async () => {
    const cardId = "123456789";
    const findByIdAndDeleteStub = sinon
      .stub(CardModel, "findByIdAndDelete")
      .returns({ exec: sinon.stub().resolves() });
    const result = await deleteCardService(cardId);

    expect(findByIdAndDeleteStub.calledWithExactly(cardId)).to.be.true;
    expect(result).to.equal("Card deleted");
  });

  it("should throw an error if there is a database update error", async () => {
    const cardId = "123456789";
    sinon
      .stub(CardModel, "findByIdAndDelete")
      .rejects(new Error("Database error"));

    try {
      await deleteCardService(cardId);
    } catch (error) {
      expect(error.message).to.equal("Database update error");
    }
  });
});
