import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: String,
  phoneNumber: String,
  birthDate: Date,
  balance: {
    type: Number,
    default: 0,
  },
});

export const UserModel = model("User", userSchema);