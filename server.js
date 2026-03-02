import "dotenv/config";
import express from "express";
import { testConnection } from "./db/index.js";
import connectCloudinary from "./config/cloudinary.js";
import productRouter from "./routes/productRequest.js";
import supportRouter from "./routes/contactSupport.js";
import quotationRouter from "./routes/quotation.js";

const app = express();
app.use(express.json());
const port = process.env.PORT;

connectCloudinary();

app.get("/", (req, res) => {
  res.send("Api is working");
});

app.use("/api/", productRouter);
app.use("/api/support", supportRouter);
app.use("/api/quotations", quotationRouter);

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
