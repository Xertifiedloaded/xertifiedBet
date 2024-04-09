import { successResMsg } from "../../helper/response.js";
import MatchDataModel from "../../models/matchData.js";

const updateFixtures = async (req, res) => {
  try {
    const { matchId } = req.params;
    const updatedFixtureData = req.body;
    const updatedFixture = await MatchDataModel.findOneAndUpdate({ matchId: matchId },
      updatedFixtureData,
      { new: true }
    );
    if (!updatedFixture) {
      return errorResMsg(res, 404, "Fixture not found");
    }
    return successResMsg(res, 200, { message: "Fixture updated successfully",updatedFixture });
  } catch (error) {
    console.error(error);
    return errorResMsg(res, 500, "failed to update fixtures");
  }
};
export default updateFixtures;