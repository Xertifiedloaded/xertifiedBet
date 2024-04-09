import mongoose from "mongoose";

const matchFixtures = new mongoose.Schema(
  {
    matchId: {
      type: String,
      unique: true,
    },
    fixture: {
      id: {
        type: String,
        unique: true,
      },
      date: String,
      startTime: String,
      endTime: String,
      extraTime: String,
      penalty: String,
      status: {
        type: String,
        enum: ["Scheduled", "FT", "Started", "HT", "ET", "PK"],
        default: "Scheduled",
      },
    },
    league: {
      id: {
        type: String,
        unique: true,
      },
      name: String,
      country: String,
    },
    teams: {
      home: {
        id: {
          type: String,
          unique: true,
        },
        name: String,
        odds: Number, 
      },
      away: {
        id: {
          type: String,
          unique: true,
        },
        name: String,
        odds: Number, 
      },
    },
    goals: {
      home: Number,
      away: Number,
    },
    score: {
      halftime: {
        home: Number,
        away: Number,
      },
      fulltime: {
        home: Number,
        away: Number,
      },
    },
  },
  { versionKey: false }
);

const MatchDataModel = mongoose.model("MatchData", matchFixtures);

export default MatchDataModel;