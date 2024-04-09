import express from "express";
import fixtures from "../controllers/fixtures/post.fixtures.controller.js";
import updateFixtures from "../controllers/fixtures/patch.fixtures.js";
import matchFixtures from "../controllers/fixtures/currentFixtures.js";
import allFixtures from "../controllers/fixtures/get.allFixtures.js";

const fixtureRoutes = express.Router();
fixtureRoutes.get("/fixtures", matchFixtures);
fixtureRoutes.get("/all-fixtures", allFixtures);
fixtureRoutes.post("/fixtures", fixtures);
fixtureRoutes.patch("/fixtures/:matchId", updateFixtures);
export default fixtureRoutes;
