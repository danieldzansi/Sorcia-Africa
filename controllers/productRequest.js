import db, { productRequest,quotations } from "../db/index.js";
import { eq } from "drizzle-orm";
import { v2 as cloudinary } from "cloudinary";
import { sendTelegramNotification } from "../utils/telegram.js";


// Temporarily disable SSL verification (remove in production)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const addRequest = async (req, res) => {
  try {
    const { fullName, email, phone, description, quantity, budget } =
      req.body;
      
    const images = req.files || [];

    const imagesUrl = await Promise.all(
      images.map(async (img) => {
        const results = await cloudinary.uploader.upload(img.path, {
          resource_type: "image",
        });
        return results.secure_url;
      }),
    );

    const productData = {
      fullName,
      phone,
      email,
      description,
      quantity: parseInt(quantity),
      budget: parseInt(budget),
      productImage: JSON.stringify(imagesUrl),
    };

    await sendTelegramNotification(productData)

    const results = await db
      .insert(productRequest)
      .values(productData)
      .returning();
    res.json({ success: true, message: "request sent successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.json({ success: false, message: error.message });
  }
};


const listAllRequest = async ( req ,res )=>{
  try {
    const allrequests = await db.select().from(productRequest)
    res.json ({success:true , allrequests})
  } catch (error) {
    console.log(error)
    res.json ({success:false , message :error.message})
  }
}

export {addRequest,listAllRequest}


const createQuote =async (req ,res)=>{
  try {
     
  } catch (error) {
    
  }
}
