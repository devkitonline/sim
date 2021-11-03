const nodemailer = require("nodemailer");

export const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAILBOX_HOST,
            // service: process.env.MAILBOX_SERVICE,
            port: process.env.MAILBOX_PORT,
            secure: true,
            auth: {
                user: process.env.MAILBOX_EMAIL,
                pass: process.env.MAILBOX_PASSWORD,
            },
        });

        await transporter.sendMail({
            from: process.env.MAILBOX_EMAIL,
            to: email,
            subject: subject,
            text: text,
        });

        console.log("email sent sucessfully");
    } catch (error) {
        console.log(error, "email not sent");
    }
};
