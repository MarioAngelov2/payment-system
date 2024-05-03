// import { expect } from "chai";
// import { registerService } from "../services/register.js";
// import * as sinon from "sinon";

// describe("Register Test", () => {
//   it("should return a new user", async () => {
//     const user = {
//       firstName: "test",
//       lastName: "test",
//       email: "test@abv.bg",
//       password: "test",
//       address: "test",
//       phoneNumber: 8222222,
//       birthDate: new Date("1999-01-01"),
//       balance: 0,
//     };

//     const save = sinon.stub(registerService(user), "then").resolves(user);

//     const result = await registerService(user);

//     expect(result).to.deep.equal(user);

//     save.restore();
//   });
// });
