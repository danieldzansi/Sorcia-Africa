import express  from "express";

import upload from "../middleware/multer.js";
import addRequest from "../controllers/productRequest.js"

const productRouter  = express.Router ()


productRouter.post ('/add',upload.array('images',10),addRequest)


export default productRouter