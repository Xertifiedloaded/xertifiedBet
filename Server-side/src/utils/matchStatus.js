import User from "../models/user.model.js";
const matchStatus = async ( fixture, outcome, prediction, amountStaked, predictedScore) => {
  if (fixture) {
    let resultMessage = "";
    let pointsEarned = 0;
    let correctMatchResult = false;

    const predictedWinnerOdds =
      prediction.prediction === "Home"
        ? fixture.teams.home.odds
        : fixture.teams.away.odds;

    switch (fixture.fixture.status) {
      case "Scheduled":
        resultMessage = "Match is scheduled to start";
        break;
      case "FT":
        if (
          fixture.score.fulltime.home === predictedScore.home &&
          fixture.score.fulltime.away === predictedScore.away
        ) {
          correctMatchResult = true;
          pointsEarned = amountStaked * predictedWinnerOdds;
          resultMessage = "Hurray💃! You won!";
          
          const user = await User.findOne({ userId: prediction.userId });
          if (user) {
            user.wallet.balance += pointsEarned;
            await user.save();
          }
        } else {
          resultMessage = "Sorry, what is cashout?";
        }
        break;
      case "Started":
        const currentTime = new Date();
        const startTime = new Date(fixture.fixture.startTime);
        const elapsedTime = currentTime - startTime;
        const halftimeDuration = 45 * 60 * 1000;
        const elapsedHalfTime = elapsedTime / halftimeDuration;
        const elapsedMinutes = Math.floor(elapsedHalfTime * 45);
        resultMessage = `Match is in progress. ${elapsedMinutes} minutes elapsed.`;
        break;
      case "HT":
        resultMessage = "Match is at halftime";
        break;
      case "ET":
        const currentTimeET = new Date();
        const startTimeET = new Date(fixture.fixture.startTime);
        const elapsedTimeET = currentTimeET - startTimeET;
        const halftimeDurationET = 15 * 60 * 1000;
        const elapsedHalfTimeET = elapsedTimeET / halftimeDurationET;
        const elapsedMinutesET = Math.floor(elapsedHalfTimeET * 15);
        if (elapsedTimeET <= halftimeDurationET) {
          resultMessage = `First half of extra time is in progress. ${elapsedMinutesET} minutes elapsed.`;
        } else {
          resultMessage = `Second half of extra time is in progress. ${elapsedMinutesET} minutes elapsed.`;
        }
        break;
      case "PK":
        resultMessage = "Match is in penalty shootout";
        break;
      default:
        resultMessage = "Match status unknown";
        break;
    }

    outcome.push({
      resultMessage,
      matchId: fixture.matchId,
      prediction,
      actualResult: fixture.score.fulltime,
      correctMatchResult,
      pointsEarned,
    });
  }
};

export default matchStatus;
