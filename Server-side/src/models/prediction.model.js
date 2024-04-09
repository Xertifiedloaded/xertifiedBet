import mongoose from "mongoose";

const betPredictionSchema = new mongoose.Schema(
  {
    matchId: {
      type: String,
      required: true,
    },
    prediction: {
      type: String,
      enum: ["Home", "Away", "Draw"],
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    predictedScore: {
      home: {
        type: Number,
        required: true,
      },
      away: {
        type: Number,
        required: true,
      },
    },
    amountStaked: {
      type: Number,
      required: true,
    },
  },
  { versionKey: false }
);

const BetPrediction = mongoose.model("BetPrediction", betPredictionSchema);

export default BetPrediction;