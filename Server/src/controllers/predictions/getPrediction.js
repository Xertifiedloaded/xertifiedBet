import { errorResMsg, successResMsg } from "../../helper/response.js";
import BetPrediction from "../../models/prediction.model.js";

const getUserPredictions = async (req, res) => {
  try {
    const userId = req.user.userId;
    const predictions = await BetPrediction.find({ userId });
    return successResMsg(res, 200, {
      message: "User predictions fetched successfully",
      predictions,
    });
  } catch (error) {
    console.error(error);
    return errorResMsg(res, 500, "Internal Server Error");
  }
};

export default getUserPredictions;
