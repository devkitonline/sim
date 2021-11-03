import {configModel} from "../models/config.model";

const nodemailer = require("nodemailer");

const getMailboxConfig = async () => {
    const mailboxConfig = await configModel.findAllByCategory("mailbox");
    let host = "";
    let port = 465;
    let email = "";
    let pass = "";
    if (mailboxConfig.length > 0) {
        for (let i = 0; i < mailboxConfig.length; i++) {
            const conf = mailboxConfig[i];
            switch (conf['name']) {
                case 'host':
                    host = conf['value'];
                    break;
                case 'port':
                    port = Number.parseInt(conf['value']);
                    break;
                case 'email':
                    email = conf['value'];
                    break;
                case 'password':
                    pass = conf['value'];
                    break;
                default:
            }
        }
    }
    return {
        host: host,
        port: port,
        email: email,
        password: pass
    }
}

export const sendEmail = async (email, subject, text) => {
    try {
        const config = await getMailboxConfig();
        console.log(config);
        const transporter = nodemailer.createTransport({
            host: config.host,
            port: config.port,
            secure: true,
            auth: {
                user: config.email,
                pass: config.password,
            },
        });

        await transporter.sendMail({
            from: process.env.MAILBOX_EMAIL,
            to: email,
            subject: subject,
            text: text,
        });

        console.log("email sent sucessfully");
        return true;
    } catch (error) {
        console.log(error, "email not sent");
        return false;
    }
};
