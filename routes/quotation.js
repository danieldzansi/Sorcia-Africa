import express from "express";
import {
  sendQuotation,
  approveQuotation,
  listQuotations,
  sendOrderNotMet,
} from "../controllers/quotation.js";

const quotationRouter = express.Router();

quotationRouter.post("/send", sendQuotation);

quotationRouter.get("/approve/:token", approveQuotation);

quotationRouter.get("/list", listQuotations);

quotationRouter.post("/order-not-met", sendOrderNotMet);

export default quotationRouter;
