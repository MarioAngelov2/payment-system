import { registerService } from "../services/register.js";
import { UserModel } from "../models/user.model.js";
import sinon from "sinon";
import { expect } from "chai";

describe("User service", () => {
  describe("Register service", () => {
    it("should register new user", (done) => {
      const userData = {
        firstName: "John",
        lastName: "Doe",
        email: "john@abv.bg",
        password: "123",
        address: "Sofia",
        phoneNumber: "0888888888",
        birthDate: "01.01.1999",
        balance: 0,
      };
      const saveStub = sinon.stub().resolves(userData);
      const newUser = { save: saveStub };

      const userModelStub = sinon.stub(UserModel, "create").returns(newUser);

      registerService(userData)
        .then((result) => {
          expect(result).to.deep.equal(userData);

          sinon.assert.calledOnce(userModelStub);
          sinon.assert.calledOnce(saveStub);

          userModelStub.restore();
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });
});
