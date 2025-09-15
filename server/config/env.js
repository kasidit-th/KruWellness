import { config } from "dotenv";

config({path: `.env.local`});

export const { 
    PORT , 
    HOST ,
    SERVER_URL,
    NODE_ENV , 
    WS_PORT
    
} = process.env;