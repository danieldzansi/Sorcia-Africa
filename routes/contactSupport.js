import express from "express";
import { contactSupport } from "../controllers/contactSupport.js";

const supportRouter = express.Router();

supportRouter.post("/contact", contactSupport);

export default supportRouter;
