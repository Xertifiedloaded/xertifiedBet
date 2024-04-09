import express from "express";
import morgan from "morgan";
import router from "./src/routes/test.routes.js";
import cors from "cors";
import authRouter from "./src/routes/auth.routes.js";
import predictionRouter from "./src/routes/prediction.routes.js";
import fixtureRoutes from "./src/routes/fixtures.routes.js";
import transactionRouter from "./src/routes/transaction.routes.js";
const app = express();
app.use(morgan("dev"));
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
      "http://localhost:5176",
      "http://localhost:5177",
    ],
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/", router);
app.use("/api/v1", authRouter);
app.use("/api/v1", authRouter);
app.use("/api/v1/fixtures", fixtureRoutes);
app.use("/api/v1/prediction", predictionRouter);
app.use("/api/v1/transaction", transactionRouter);

export default app;
