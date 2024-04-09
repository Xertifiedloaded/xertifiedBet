import express from "express";
import { Landing, NotFound } from "../controllers/test/landing.js";


const router = express.Router();
router.get("/", Landing);
// router.get("*", NotFound);


export default router;