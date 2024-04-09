import { v4 as uuidv4 } from "uuid";
import MatchDataModel from "../../models/matchData.js";
import { errorResMsg, successResMsg } from "../../helper/response.js";

const createFixture = async (req, res) => {
  try {
    const { teams, fixture, league, goals, score } = req.body;
    const matchId = uuidv4();
    const fixtureId = uuidv4();
    const leagueId = uuidv4();
    const homeTeamId = uuidv4();
    const awayTeamId = uuidv4();
    const newFixture = await MatchDataModel.create({
      matchId: matchId,
      fixture: {
        id: fixtureId,
        date: fixture.date,
        startTime: fixture.startTime,
        endTime: fixture.endTime, 
        extraTime: fixture.extraTime, 
        penalty: fixture.penalty, 
        status: fixture.status,
      },
      league: {
        id: leagueId,
        name: league.name,
        country: league.country,
      },
      teams: {
        home: {
          id: homeTeamId,
          name: teams.home.name,
          odds: teams.home.odds, 
        },
        away: {
          id: awayTeamId,
          name: teams.away.name,
          odds: teams.away.odds, 
        },
      },
      goals: {
        home: goals.home,
        away: goals.away,
      },
      score: {
        halftime: {
          home: score.halftime.home,
          away: score.halftime.away,
        },
        fulltime: {
          home: score.fulltime.home,
          away: score.fulltime.away,
        },
      },
    });

    return successResMsg(res, 201, {
      message: "Fixture created successfully",
      newFixture,
    });
  } catch (error) {
    console.error(error);
    return errorResMsg(res, 500, "Internal Server Error");
  }
};

export default createFixture;