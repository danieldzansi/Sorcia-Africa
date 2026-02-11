import "dotenv/config";
import express from "express";
import  {testConnection}  from "./db/index.js";
import connectCloudinary from "./config/cloudinary.js";
import productRouter from "./routes/productRequest.js"

const app =express()
const port =process.env.PORT 

connectCloudinary();


app.get("/", (req ,res )=>{
    res.send("Api is working")
});

app.use ("/api/", productRouter)

const start =async () =>{
    try {
        await testConnection()
        app.listen(port,()=>{
            console.log(`server is running on PORT :${port}`)
        })
    } catch (error) {
        console.error ("failed to start sever",error)
        process.exit(1)
    }
} 

start ()