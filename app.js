import express from 'express';
import { configDotenv } from 'dotenv';
import fs from 'fs';
import path from 'path';
configDotenv();

const app = express();

app.use(express.static(path.join(process.cwd(), '/public')));

const home = async ( req , res , next ) => {
    const html = fs.readFileSync(path.join(process.cwd(), '/index.html'), 'utf-8');
    return res.status(200).send(html);
};

app.get('/' , home);
app.get("*" , home);

// app.listen(80, () => console.log('Server is running on port 80'));
export default app;