import "dotenv/config"
import express from "express"

const app =express()
const port =process.env.PORT 


app.get("/", (req ,res )=>{
    res.send("Api is working")
});

const start =async () =>{
    try {
        app.listen(port,()=>{
            console.log(`server is running on PORT :${port}`)
        })
    } catch (error) {
        console.error ("failed to start sever",error)
        process.exit(1)
    }
} 

start ()