import { errorResMsg, successResMsg } from "../../helper/response.js";
import MatchDataModel from "../../models/matchData.js";
import BetPrediction from "../../models/prediction.model.js";
import matchStatus from "../../utils/matchStatus.js";

const predictionResult = async (req, res) => {
  try {
    const fixtures = await MatchDataModel.find();
    const predictions = await BetPrediction.find();
    const outcome = [];

    predictions.forEach((prediction) => {
      const fixture = fixtures.find(
        (fixture) => fixture.matchId === prediction.matchId
      );
      const amountStaked = prediction.amountStaked;
      matchStatus(fixture, outcome, prediction, amountStaked);
    });

    return successResMsg(res, 200, {
      message: "Prediction result fetched successfully",
      outcome,
    });
  } catch (error) {
    console.error(error);
    return errorResMsg(res, 500, "Internal Server Error");
  }
};

export default predictionResult;
