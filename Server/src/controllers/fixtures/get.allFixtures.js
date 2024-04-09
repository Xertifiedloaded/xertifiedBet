import { errorResMsg, successResMsg } from "../../helper/response.js";
import MatchDataModel from "../../models/matchData.js";

const allFixtures = async (req, res) => {
    try {
      const fixtures = await MatchDataModel.find().sort({
        "fixture.date": "asc",
        "fixture.time": "asc",
      });
      successResMsg(res, 200, {
        message: "All fixtures fetched successfully",
        fixtures,
      });
    } catch (error) {
      console.error(error);
      errorResMsg(res, 500, "Failed to fetch fixtures");
    }
  };

  export default allFixtures