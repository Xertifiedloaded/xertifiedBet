import express from "express";
import { Landing, NotFound } from "../controllers/test/landing.js";
import multer from "multer";
import isAuthenticated from "../middleware/isAuthenticated.js";
import createTransaction from "../controllers/transaction/debitAndCredit.js";
const newUpload = multer().none();
const transactionRouter = express.Router();

transactionRouter.post(
  "/payment",
  newUpload,
  isAuthenticated,
  createTransaction
);

export default transactionRouter;
