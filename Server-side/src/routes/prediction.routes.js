import express from "express";
import multer from "multer";
import isAuthenticated from "../middleware/isAuthenticated.js";
import createBetPrediction from "../controllers/predictions/createBetPrediction.js";
import getUserPredictions from "../controllers/predictions/getPrediction.js";
import predictioResult from "../controllers/predictions/prediction-result.js";
const newUpload = multer().none();

const predictionRouter = express.Router();
predictionRouter.post("/predict", isAuthenticated, createBetPrediction);
predictionRouter.get("/predict", isAuthenticated, getUserPredictions);
predictionRouter.get("/predict-result", isAuthenticated, predictioResult);

export default predictionRouter;
