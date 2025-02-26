import express from 'express';
import { configDotenv } from 'dotenv';
import fs from 'fs';
import path from 'path';
import dbConnect from './config/dbConnect.js';
import { apiResponse } from './api/apiResponse.js';
import { apiRateLimiter } from "./utils/rateLimiter.js";
configDotenv();

dbConnect();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), '/public')));

const home = async ( req , res , next ) => {
    const html = fs.readFileSync(path.join(process.cwd(), '/index.html'), 'utf-8');
    return res.status(200).send(html);
};

app.post("/api/response" , apiRateLimiter , apiResponse);

app.get('/' , home);
app.get("*" , (req, res) => res.status(404).send("Page not found"));


// app.listen(80, () => console.log('Server is running on port 80'));
export default app;