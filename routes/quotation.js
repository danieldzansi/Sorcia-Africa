import express from "express";
import {
  sendQuotation,
  approveQuotation,
  listQuotations,
} from "../controllers/quotation.js";

const quotationRouter = express.Router();

quotationRouter.post("/send", sendQuotation);

quotationRouter.get("/approve/:token", approveQuotation);

quotationRouter.get("/list", listQuotations);

export default quotationRouter;
