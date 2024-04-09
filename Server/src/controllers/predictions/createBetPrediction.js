import { errorResMsg, successResMsg } from "../../helper/response.js";
import MatchDataModel from "../../models/matchData.js";
import BetPrediction from "../../models/prediction.model.js";
import User from "../../models/user.model.js";

const createBetPrediction = async (req, res) => {
  try {
    const { matchId, prediction, predictedScore, amountStaked } = req.body;
    const userId = req.user.userId;
    const user = await User.findOne({ userId });
    if (!user) {
      return errorResMsg(res, 404, "User not found");
    }
    if (user.wallet.balance < amountStaked) {
      return errorResMsg(res, 400, "Insufficient balance");
    }
    user.wallet.balance -= amountStaked;
    await user.save();
    const matchDetails = await MatchDataModel.findOne({ matchId });
    if (!matchDetails) {
      return errorResMsg(res, 404, "Match not found");
    }
    const matchName = `${matchDetails.teams.home.name} vs ${matchDetails.teams.away.name}`;
    const newBetPrediction = await BetPrediction.create({
      matchId,
      prediction,
      userId,
      predictedScore,
      amountStaked,
    });
    return successResMsg(res, 201, {
      message: "Bet prediction created successfully",
      matchName,
      newBetPrediction,
      newBalance: user.wallet.balance,
    });
  } catch (error) {
    console.error(error);
    return errorResMsg(res, 500, "Error creating Prediction");
  }
};

export default createBetPrediction;
