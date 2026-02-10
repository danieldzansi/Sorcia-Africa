import db , {productRequest, store} from "../db/index.js"
import { eq } from 'drizzle-orm'


const addRequest =async (req , res )=>{
    try {
        const {firstName , lastName , email , phone, description, quantity, budget }=req.body
        
        const productData = {
            firstName,
            lastName,
            phone,
            email,
            description ,
            quantity,
            budget ,
        }

        const results =await db.insert (productRequest).values(productData).returning();
    } catch (error) {
        
    }
}