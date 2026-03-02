import "dotenv/config";
import express from "express";
import cors from "cors";
import { testConnection } from "./db/index.js";
import connectCloudinary from "./config/cloudinary.js";
import productRouter from "./routes/productRequest.js";
import supportRouter from "./routes/contactSupport.js";
import quotationRouter from "./routes/quotation.js";
import authRouter from "./routes/auth.js";

const app = express();
app.use(
  cors({
    origin: [
      process.env.ADMIN_URL,
      process.env.FRONTEND_URL,
      "http://localhost:5173",
    ],
    credentials: true,
  }),
);
app.use(express.json());
const port = process.env.PORT || 4000;

connectCloudinary();

app.get("/", (req, res) => {
  res.send("Api is working");
});

app.use("/api/", productRouter);
app.use("/api/support", supportRouter);
app.use("/api/quotations", quotationRouter);
app.use("/api/auth", authRouter);

const start = async () => {
  try {
    await testConnection();
    app.listen(port, () => {
      console.log(`server is running on PORT :${port}`);
    });
  } catch (error) {
    console.error("failed to start sever", error);
    process.exit(1);
  }
};

start();
