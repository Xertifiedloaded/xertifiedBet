import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const transactionSchema = new mongoose.Schema({
  userId: {
    type: String, 
    ref: "User",
    required: true,
  },
  accountNumber: {
    type: Number,
    required: true,
  },
  amount: {
    type: mongoose.Decimal128,
    required: true,
  },
  type: {
    type: String,
    enum: ["credit", "debit"],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  reference: {
    type: String,
    unique: true,
    default: uuidv4,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
