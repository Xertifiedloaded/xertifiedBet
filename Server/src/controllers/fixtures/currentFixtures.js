import { errorResMsg, successResMsg } from "../../helper/response.js";
import MatchDataModel from "../../models/matchData.js";
import moment from "moment";
// fetch by current date
const matchFixtures = async (req, res) => {
  try {
    const currentDate = moment().format("YYYY-MM-DD");
    const fixtures = await MatchDataModel.find({
      "fixture.date": currentDate,
    }).sort({ "fixture.time": "asc" });
    successResMsg(res, 200, {
      message: "Fixtures for today fetched successfully",
      fixtures,
    });
  } catch (error) {
    console.error(error);
    errorResMsg(res, 500, "Failed to fetch fixtures");
  }
};

export default matchFixtures
