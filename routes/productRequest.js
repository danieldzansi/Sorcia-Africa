import express  from "express";

import upload from "../middleware/multer.js";
import {addRequest,listAllRequest} from "../controllers/productRequest.js"

const productRouter  = express.Router ()


productRouter.post ('/add',upload.array('images',10),addRequest)
productRouter.get ('/get',listAllRequest)

export default productRouter