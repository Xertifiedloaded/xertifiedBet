import { errorResMsg } from "../helper/response.js";
import User from "../models/user.model.js";

export const updateBalances = async (
  senderUserId,
  accountNumber,
  amount,
  type,
  description
) => {
  const recipientUser = await User.findOne({ accountNumber });
  if (!recipientUser) {
    throw new Error("No user found with the specified account number");
  }
  const senderUser = await User.findOne({ userId: senderUserId });
  if (!senderUser) {
    throw new Error("No user found with the specified sender ID.");
  }
  // basicly the balance are in string and it concartenate it so i need to convert the string to Number
  // so is either i use Number() method or parse float to convert the string to number
  let updatedSenderBalance = senderUser.wallet.balance;
  let updatedRecipientBalance = recipientUser.wallet.balance;
  updatedSenderBalance = Number(updatedSenderBalance);
  updatedRecipientBalance = Number(updatedRecipientBalance);
  amount = Number(amount);

  if (type === "debit") {
    if (senderUser.wallet.balance < amount) {
      throw new Error("Insufficient balance");
    }
    updatedSenderBalance -= amount;
    updatedRecipientBalance += amount;
    
  } else if (type === "credit") {
    if (senderUser.wallet.balance < amount) {
      throw new Error("Insufficient balance");
    }
    updatedSenderBalance -= amount;
    updatedRecipientBalance += amount;
  }
  await User.findOneAndUpdate(
    { userId: senderUserId },
    { $inc: { "wallet.balance": -amount } },
    { new: true }
  );

  await User.findOneAndUpdate(
    { accountNumber: accountNumber },
    { $inc: { "wallet.balance": amount } },
    { new: true }
  );

  return { updatedSenderBalance, updatedRecipientBalance,description };
};
