import { expect } from "chai";
import sinon from "sinon";
import { UserModel } from "../models/user.model.js";
import { registerService } from "../services/authService.js";

describe("Register Service", () => {
  let sampleUser;

  beforeEach(() => {
    sampleUser = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: "password123",
      address: "123 Main St",
      phoneNumber: "8888888",
      birthDate: "01.01.2000",
      balance: 1000,
    };

    sinon.stub(UserModel.prototype, "save").callsFake(() => sampleUser);
  });

  it("should register user", async () => {
    const user = await registerService(sampleUser);

    expect(user).to.deep.equal(sampleUser);
  });
});
