import {query} from "@/lib/db/db";
import {IUsers} from "@/lib/utils/interfaces";
import jwt from 'jsonwebtoken';

const md5 = require('md5');

const EXPIRES_TOKEN = 2592000; //seconds
const KEY = process.env.JWT_SECRET_KEY;

export default function handler(req, res) {
    const {
        query: {id, name},
        method,
    } = req

    switch (method) {
        case 'POST':
            const bodyRequest = JSON.parse(req.body);
            if (!checkParams(bodyRequest)) {
                res.status(200).json({code: 103, message: `Expression parameter not all.`});
                return;
            }

            getUser(bodyRequest.username, bodyRequest.password)
            .then(result => {

                if (result !== undefined){
                    const user: IUsers = {
                        id: result.id,
                        username: result.username,
                        pwd: result.pwd,
                        email: result.email,
                        firstName: result.first_name,
                        lastName: result.last_name,
                        role: result.role,
                        isAdmin: result.is_admin == 1
                    }

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
                            expiresIn: EXPIRES_TOKEN, // 1 year in seconds
                        },
                        (err, token) => {
                            /* Send succes with token */
                            res.status(200).json({code: 1, message: `Login successful.`, token: token});
                            return;
                        },
                    );

                }else{
                    res.status(200).json({code: 104, message: `Username or Password is incorrect.`});
                    return;
                }
            })
            .catch(error => {
                res.status(200).json({code: 104, message: `Username or Password is incorrect.`});
                return;
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

const getUser = async (username, password): Promise<any> => {
    const md5Pass = md5(password);
    const queryString = "SELECT id, username, pwd, email, first_name, last_name, role, is_admin  FROM users  WHERE username = ? AND pwd = ?";
    const queryResult = await query(
        queryString,
        [username, md5Pass]
    );

    return queryResult[0];
}
