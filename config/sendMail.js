import nodemailer from 'nodemailer';
import { configDotenv } from 'dotenv';
configDotenv();




export default async ({ email , subject , html }) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: parseInt(process.env.MAIL_PORT, 10),
            secure: parseInt(process.env.MAIL_PORT, 10) === 465? true : false,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        
        const mailOptions = {
            from: `New-Response <${process.env.MAIL_USER}>`,
            to: email,
            subject: subject,
            html,
        };
        
        const a = await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.log(error);
        return null;
    };
}