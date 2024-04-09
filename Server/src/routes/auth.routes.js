import express from "express";
import register from "../controllers/auth/register.js";
import loginUsers from "../controllers/auth/login.auth.js";
import upload from "../middleware/multer.js";
import multer from "multer";
import { updateProfile } from "../controllers/auth/editProfile.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { getUserProfile } from "../controllers/auth/getUserProfile.js";
const newUpload = multer().none();
const authRouter = express.Router();

authRouter.post("/register", newUpload, register);
authRouter.post("/login", newUpload, loginUsers);
authRouter.post("/profile",upload.single("image"), isAuthenticated, updateProfile);
authRouter.get("/profile", isAuthenticated, getUserProfile);

export default authRouter;
