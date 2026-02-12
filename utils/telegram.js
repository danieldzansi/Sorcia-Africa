import "dotenv/config";



const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const CHAT_ID = process.env.TELEGRAM_CHAT_ID 


export const sendTelegramNotification = async (data)=>{
    try {
        const message =` NEW PRODUCT REQUEST 
         FirstName: ${data.firstName}
         LastName: ${data.lastName}
         Phone: ${data.phone}
         Email: ${data.email}
         Description: ${data.description}
         Quantity: ${data.quantity}
         Budget: ${data.budget}
         image: ${data.productImage}
         check Admin dashboard .
         `

         await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,{
            method :"POST",
            headers:{
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({
                chat_id :CHAT_ID,
                text : message


            })
        
         })
    } catch (error) {
        console.error("Telegram Error:", error)
    }
}