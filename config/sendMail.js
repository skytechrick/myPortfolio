import nodemailer from 'nodemailer';

export default async (email, subject, html) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: process.env.MAIL_PORT === 465,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        const mailOptions = {
            from: "New response <" + process.env.MAIL_USER + ">",
            to: email,
            subject: subject,
            html,
        };

        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        return null;
    };
}