import { expect } from "chai";
import sinon from "sinon";
import { UserModel } from "../models/user.model.js";
import bcrypt from "bcrypt";
import { registerService } from "../services/register.js";

describe("Register Service", () => {
  let saveStub, hashStub, sampleUser;

  beforeEach(() => {
    sampleUser = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: "password123",
      address: "123 Main St",
      phoneNumber: 8888888,
      birthDate: new Date(),
      balance: 1000,
    };

    saveStub = sinon.stub(UserModel.prototype, "save");
    hashStub = sinon.stub(bcrypt, "hash");
  });

  afterEach(() => {
    saveStub.restore();
    hashStub.restore();
  });

  it("should register user", async () => {
    hashStub.resolves("hashedpassword123");
    saveStub.resolves(sampleUser);

    const user = await registerService(sampleUser);

    expect(user).to.deep.equal(sampleUser);
    sinon.assert.calledOnceWithExactly(hashStub, sampleUser.password, 10);
    sinon.assert.calledOnce(saveStub);
  });

  it("should throw an error when there is a database update error", async () => {
    hashStub.resolves("hashedpassword123");
    saveStub.throws(new Error("Database update error"));

    try {
      await registerService(sampleUser);
    } catch (error) {
      expect(error).to.be.an("error");
      expect(error.message).to.equal("Database update error");
    }

    sinon.assert.calledOnceWithExactly(hashStub, sampleUser.password, 10);
    sinon.assert.calledOnce(saveStub);
  });
});
