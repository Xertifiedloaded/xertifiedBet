import BetPrediction from "../../models/prediction.model.js";
import Transaction from "../../models/transaction.js";
import User from "../../models/user.model.js";
import Profile from "../../models/userProfile.js";


export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const [user, transactions, predictions] = await Promise.all([
        User.findOne({ userId }),
        Transaction.find({ userId }),
        BetPrediction.find({ userId }),
      ]);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

    const profile = new Profile({
      userId: user.userId,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      picture: user.picture,
      address: user.address,
      accountNumber: user.accountNumber,
      balance: user.wallet.balance,
      referrals: user.referrals,
      transactionHistory: transactions,
      predictions: predictions,
    });

    res.status(200).json({ profile });
  } catch (error) {
    console.error("Error retrieving user profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
