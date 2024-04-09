import { errorResMsg } from "../helper/response.js";

export const validateTransactionFields = (req, res) => {
    const { accountNumber, amount, type,description } = req.body;
    const senderUserId = req.user.userId;
    if (!accountNumber || !amount || !type,!description) {
      return errorResMsg(
        res,
        400,
        "Please provide recipient's account number, amount, and type and description"
      );
    }
    return { accountNumber, amount, type, senderUserId,description };
  };