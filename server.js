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
const port = process.env.PORT || 4000;

const frontendUrls = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(",").map((url) => url.trim())
  : [];

const allowedOrigins = [
  process.env.ADMIN_URL,
  ...frontendUrls,
  "http://localhost:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

connectCloudinary();


app.get("/", (req, res) => {
  res.send("API is working");
});

app.use("/api/", productRouter);
app.use("/api/support", supportRouter);
app.use("/api/quotations", quotationRouter);
app.use("/api/auth", authRouter);


const start = async () => {
  try {
    await testConnection();

    app.listen(port, () => {
      console.log(`Server is running on PORT: ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

start();