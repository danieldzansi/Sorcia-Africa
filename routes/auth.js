import express from "express";
import { login, verifyToken } from "../controllers/auth.js";

const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.get("/verify", verifyToken);

export default authRouter;
