import mongoose from "mongoose";
import generateAccountNumber from "../utils/accountNumber.js";
import { Decimal128 } from "mongoose";
const userSchema = new mongoose.Schema(
  {
    userId: String,
    username: String,
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      unique: true,
      required: true,
    },
    firstName: {
      type: String,
      default: null
    },
    lastName: {
      type: String,
      default: null
    },
    picture: {
      type: String,
      default: null
    },
    address: {
      type: String,
      default: null
    },
    accountNumber: {
      type: Number,
      unique: true,
    },
    referralCode: String,
    referredBy: String,
    token: String,
    wallet: {
      balance: {
        type: Number,
        default: 0.0,
        required: true,
      },
    },
  },
  { versionKey: false }
);

userSchema.pre("save", function (next) {
  if (!this.accountNumber) {
    this.accountNumber = generateAccountNumber();
  }
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
