
import apiResponseModel from "../models/apiResponseModel.js";
import { apiResponseSchema } from "../utils/zodSchema.js";
import sendMail from "../config/sendMail.js";

export const apiResponse = async ( req , res , next ) => {
    try {
        
        const validData = apiResponseSchema.safeParse(req.body);

        if (!validData.success) {
            return res.status(400).json({
                status: "failed",
                message: "Unauthorized Access and Unauthorized Request",
            });
        };

        const { name, mobileNumber, email, type, message } = validData.data;

        const newApiResponse = new apiResponseModel({
            name,
            mobileNumber,
            email,
            type,
            message,
            ip: req.ip,
            agent: req.headers['user-agent'],
            referer: req.headers['referer'],
            src: req.params.src || undefined,
        });

        await newApiResponse.save();

        const mailData = {
            email: process.env.EMAIL_USER,
            subject: "New Response Received - Your portfolio - Rick Sarkar",
            html: `
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>User Information</title>
                    </head>
                    <body>
                        <div>
                            <h1>New Response Received</h1>
                            <p>Here are the details of the user:</p>
                            <br>
                            <strong>ID:</strong> ${newApiResponse._id.toString()} <br>
                            <strong>Name:</strong> ${name} <br>
                            <strong>Mobile Number:</strong> ${mobileNumber || "Not added"} <br>
                            <strong>Email:</strong> ${email} <br>
                            <strong>Type:</strong> ${type} <br>
                            <strong>Message:</strong> ${message.replace(/\n/g, '<br>')} <br>
                            <strong>IP:</strong> ${req.ip} <br>
                            <strong>Agent:</strong> ${req.headers['user-agent']} <br>
                            <strong>Referer:</strong> ${req.headers['referer']} <br>
                            <strong>Source:</strong> ${req.params.src || "Not added"} <br>
                            <strong>Time:</strong> ${new Date().toLocaleString()} <br>
                        </div>
                    </body>
                    </html>

            `,
        };

        const isMailSent = await sendMail(mailData);

        if (!isMailSent) {
            return res.status(500).json({
                status: "failed",
                message: "Unable to sent mail.",
            });
        };

        return res.status(200).json({
            status: "success",
            message: "Your response has been recorded successfully.",
        });

    } catch (error) {
        return res.status(500).json({
            status: "failed",
            message: "Internal Server Error",
        });
    };
};