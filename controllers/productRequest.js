import db, { productRequest } from "../db/index.js";
import { eq } from "drizzle-orm";
import { v2 as cloudinary } from "cloudinary";

// Temporarily disable SSL verification (remove in production)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const addRequest = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, description, quantity, budget } =
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
      firstName,
      lastName,
      phone,
      email,
      description,
      quantity: parseInt(quantity),
      budget: parseInt(budget),
      productImage: JSON.stringify(imagesUrl),
    };

    const results = await db
      .insert(productRequest)
      .values(productData)
      .returning();
    res.json({ success: true, message: "request senf successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.json({ success: false, message: error.message });
  }
};

export default addRequest;
