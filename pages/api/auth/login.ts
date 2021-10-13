import {IUser} from "helpers/interfaces";
import jwt from 'jsonwebtoken';
import {userModel} from "models/user.model";

const md5 = require('md5');

const EXPIRES_TOKEN = 2592000; //seconds
const KEY = process.env.JWT_SECRET_KEY;

export default async function handler(req, res) {
    const {
        query: {id, name},
        method,
    } = req
    // console.log('req',req);
    switch (method) {
        case 'POST':
            const bodyRequest = req.body;
            if (!checkParams(bodyRequest)) {
                res.status(200).json({code: 103, message: `Expression parameter not all.`});
                return;
            }

            await userModel.findOne(bodyRequest.username, md5(bodyRequest.password), (err: string, user: IUser) => {
                if (err) {
                    res.status(200).json({code: 104, message: `Username or Password is incorrect.`});
                    return;
                } else {
                    const payload = {
                        id: user.id,
                        username: user.username,
                        email: user.email,
                        role: user.role,
                        is_admin: user.isAdmin
                    }

                    jwt.sign(
                        payload,
                        KEY,
                        {
                            expiresIn: EXPIRES_TOKEN,
                        },
                        (err, token) => {
                            if (err) {
                                res.status(200).json({code: 105, message: `Can not sign in token`});
                                return;
                            } else {
                                /* Send succes with token */
                                res.status(200).json({code: 1, message: `Login successful.`, user: {id: user.id, token: token}});
                                return;
                            }
                        },
                    );

                    return;
                }
            });

            break;
        default:
            res.setHeader('Allow', ['POST'])
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}

const checkParams = (body): boolean => {
    return !(!body.username || !body.password);
}
