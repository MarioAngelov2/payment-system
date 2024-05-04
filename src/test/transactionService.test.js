import { expect } from "chai";
import sinon from "sinon";
import { TransactionModel } from "../models/transaction.model.js";
import { transactionService } from "../services/transactionsService.js";

describe("Transaction Service", () => {
  let sampleTransaction;

  beforeEach(() => {
    sampleTransaction = {
      senderId: "123",
      receiverId: "145",
      amount: 100,
      cardNumber: "123456789",
      cardId: "123212",
    };

    sinon
      .stub(TransactionModel.prototype, "save")
      .callsFake(() => sampleTransaction);
  });

  it("should create a transaction", async () => {
    const transaction = await transactionService(sampleTransaction);
    console.log("transaction", transaction);
    console.log("sampleTransaction", sampleTransaction);

    expect(transaction).to.deep.equal(sampleTransaction);
  });
});
