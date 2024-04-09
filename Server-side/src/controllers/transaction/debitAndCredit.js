import { successResMsg } from "../../helper/response.js";
import Transaction from "../../models/transaction.js";
import { updateBalances } from "../../utils/updateBalance.js";
import { validateTransactionFields } from "../../utils/validateTransaction.js";
const createTransaction = async (req, res, next) => {
  try {
    const { accountNumber, amount, type, senderUserId,description } =
      validateTransactionFields(req, res);
    if (!senderUserId) return;
    const { updatedSenderBalance, updatedRecipientBalance } =
      await updateBalances(
        senderUserId,
        accountNumber,
        amount,
        type,
        description
      );
    const newTransaction = new Transaction({
      userId: senderUserId,
      accountNumber,
      amount,
      type,
      description
    });

    await newTransaction.save();
    return successResMsg(res, 201, {
      message: "Transaction created successfully",
      transaction: newTransaction,
      updatedSenderBalance,
      updatedRecipientBalance,
    });
  } catch (error) {
    next(error);
  }
};

export default createTransaction;
