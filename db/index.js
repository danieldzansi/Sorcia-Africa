import pg from 'pg'
import { drizzle } from 'drizzle-orm/node-postgres'
const {Pool} =pg 
import {
    pgTable,
    serial,
    text,
    jsonb,
    numeric,
    timestamp,
}from 'drizzle-orm/pg-core'

const connectionString =process.env.DATABASE_URL

if (!connectionString){
    console.warn ("DATABASE_URL is not set.postgres connection will not be established")
}

export const pool =new Pool ({
    connectionString: process.env.DATABASE_URL,
    // ssl:{
    //    rejectUnauthorized : false 
    // }
})

export const testConnection =async ()=>{
    try {
        const client =await pool.connect ();
        console.log("postgress pool connected")
        client.release(); 
    } catch (error) {
       console.warn ("Postgres connection test failed", error) 
    }
}