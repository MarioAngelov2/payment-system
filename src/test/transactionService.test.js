import { expect } from "chai";
import sinon from "sinon";
import { TransactionModel } from "../models/transaction.model.js";
import { UserModel } from "../models/user.model.js";
import { CardModel } from "../models/card.model.js";
import { transactionService } from "../services/transactionsService.js";
import { decryptCard } from "../utils/decryptCard.js";

describe("Transaction Service", () => {
  let sampleTransaction, sampleCard, sampleUser, iv;

  beforeEach(() => {
    sampleTransaction = {
      senderId: "123",
      receiverId: "145",
      amount: 100,
      cardNumber: "123456789",
      cardId: "123212",
    };

    sampleCard = {
      _id: "123212",
      cardNumber: "123456789",
      cardHolder: "John Doe",
      expirationDate: "01.02.2023",
      userId: "123",
      encryptionIV: "123",
    };

    sampleUser = {
      _id: "123",
      firstName: "John",
      lastName: "Doe",
      email: "test@abv.bg",
      password: "123",
      address: "123 Main St",
      phoneNumber: "123",
      birthDate: "01.01.2000",
      balance: 1000,
    };

    sinon.stub(CardModel, "findOne").callsFake(() => sampleCard);

    sinon.stub(UserModel, "findOne").callsFake(() => sampleUser);

    sinon
      .stub({ decryptCard: decryptCard }, "decryptCard").callsFake(() => {
       return sampleCard.cardNumber; 
      });

    sinon
      .stub(TransactionModel.prototype, "save")
      .callsFake(() => sampleTransaction);
  });

  it("should create a transaction", async () => {
    try {
      const transaction = await transactionService(sampleTransaction);

      expect(transaction.sender).to.equal(sampleTransaction.senderId);
      expect(transaction.receiver).to.equal(sampleTransaction.receiverId);
      expect(transaction.amount).to.equal(sampleTransaction.amount);
    } catch (error) {
      console.log(error);
    }
  });
});
