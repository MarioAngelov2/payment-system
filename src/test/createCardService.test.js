import { expect } from "chai";
import sinon from "sinon";
import { createCardService } from "../services/cardsService.js";
import { CardModel } from "../models/card.model.js";
import { encryptCard } from "../utils/encryptCard.js";
import crypto from "crypto";

describe("createCardService", () => {
  afterEach(() => {
    sinon.restore();
  });

  it("should create a new card successfully", async () => {
    const cardData = {
      cardNumber: "123456789",
      cardHolder: "John Doe",
      expirationDate: "12/25",
      userId: "user123",
    };

    const encryptedData = Buffer.from("hey", "hex"); //process.env.ENCRYPTION_SECRET_KEY
    const iv = crypto.randomBytes(16);
    sinon.stub(CardModel, "find").returns({ exec: sinon.stub().resolves([]) });

    sinon
      .stub({ encryptCard: encryptCard }, "encryptCard")
      .returns({ encryptedData, iv: iv.toString() });

    sinon.stub().resolves(cardData);
    sinon.stub(CardModel.prototype, "save").returns(cardData);

    let result;
    try {
      result = await createCardService(cardData);
    } catch (err) {
      console.log(err);
    }
    expect(result.cardHolder).to.equal(cardData.cardHolder);
    expect(result.expirationDate).to.equal(cardData.expirationDate);
  });

  it("should throw an error if card number is not 9 digits long", async () => {
    let error;
    const cardData = {
      cardNumber: "12345678",
      cardHolder: "John Doe",
      expirationDate: "12/25",
      userId: "user123",
    };
    try {
      await createCardService(cardData);
    } catch (err) {
      error = err;
    }
    console.log(error);
    sinon.stub().resolves(cardData);
    expect(error.message).to.equal("Database update error");
  });

  it("should throw an error if user already has 5 cards", async () => {
    const cardData = {
      cardNumber: "123456789",
      cardHolder: "John Doe",
      expirationDate: "12/25",
      userId: "user123",
    };

    sinon
      .stub(CardModel, "find")
      .returns({ exec: sinon.stub().resolves(Array(5)) });

    let error;

    try {
      await createCardService(cardData);
    } catch (err) {
      error = err;
    }

    await expect(error.message).to.equal("Database update error");
  });

  it("should throw an error if database update fails", async () => {
    const cardData = {
      cardNumber: "123456789",
      cardHolder: "John Doe",
      expirationDate: "12/25",
      userId: "user123",
    };

    sinon.stub(CardModel, "find").returns({ exec: sinon.stub().resolves([]) });
    sinon
      .stub(CardModel.prototype, "save")
      .rejects(new Error("Database update error"));
    let error;
    try {
      await createCardService(cardData);
    } catch (err) {
      error = err;
    }
  });
});
