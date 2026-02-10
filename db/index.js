import pg from 'pg'
import { drizzle } from 'drizzle-orm/node-postgres'
const {Pool} =pg 
import {
    pgTable,
    text,
    uuid,
    integer,
    varchar,
    timestamp,
}from 'drizzle-orm/pg-core'
import { sql } from "drizzle-orm"


const connectionString =process.env.DATABASE_URL

if (!connectionString){
    console.warn ("DATABASE_URL is not set postgres connection will not be established")
}

export const pool =new Pool ({
    connectionString: process.env.DATABASE_URL,
})

export const db =drizzle(pool)

export const testConnection =async ()=>{
    try {
        const client =await pool.connect ();
        console.log("postgress pool connected")
        client.release(); 
    } catch (error) {
       console.warn ("Postgres connection test failed", error) 
    }
}

export const productRequest =pgTable ("product_request",{
    id: uuid("id").default(sql`gen_random_uuid()`).primaryKey(),
    firstName : varchar ("first_name").notNull(),
    lastName : varchar("last_name").notNull(),
    email : varchar("email").notNull(),
    phone : varchar("phone").notNull(),
    productImage :text ("product_image").notNull(),
    description : text ("description").notNull(),
    quantity : integer ("quantity").notNull(),
    budget : integer ("budget").notNull(),
    createdAt :timestamp("create_at").defaultNow()
})



export default db 