import {userModel} from "../../../models/user.model";
import {IUser} from "helpers/interfaces";
import {sendEmail} from "../../../helpers/mailbox";
const md5 = require('md5');

export default function handler(req, res) {
    const {
        method,
    } = req

    switch (method) {
        case 'POST':
            const bodyRequest = req.body;

            if (!checkParams(bodyRequest)) {
                res.status(200).json({code: 103, message: `Expression parameter not all.`});
                return;
            }

            userModel.findOneByUnOrEmail(bodyRequest.email, async (err, user: IUser) => {
                if (err) {
                    res.status(200).json({code: 106, message: `The user is not exists.`});
                    return;
                } else {
                    const timestamp = new Date().getTime();
                    const newPass = `${timestamp}@${user.username}`;

                    await userModel.updatePwd(user.id, md5(newPass), async (err) => {
                        if (err) {
                            res.status(200).json({code: 400, message: err});
                            return;
                        } else {
                            const emailBody = `Your account password was reset. New password is: ${newPass}. Please change your password again after login.`;

                            const sendEmailRes = await sendEmail(user.email, "Password reset", emailBody);
                            if (sendEmailRes == true){
                                res.status(200).json({code: 1, message: `Success.`});
                            }else{
                                res.status(200).json({code: 400, message: `Reset password email has not been seen.`});
                            }
                            return;
                        }
                    });

                }
            });

            break;
        default:
            res.setHeader('Allow', ['POST'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}

const checkParams = (body): boolean => {
    return !(!body.email);
}
