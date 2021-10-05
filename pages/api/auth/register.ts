import {IUser} from "@/lib/utils/interfaces";
import {v4 as uuidv4} from 'uuid';
import {userModel} from "models/user.model";

const md5 = require('md5');

export default async function handler(req, res) {
    const {
        query: {id, name},
        method,
    } = req;

    switch (method) {
        case 'POST':
            const bodyRequest = JSON.parse(req.body);

            if (!checkBodyParams(bodyRequest)) {
                res.status(200).json({code: 103, message: `Expression parameter not all.`});
            }

            const newUser: IUser = {
                username: bodyRequest.username,
                pwd: md5(bodyRequest.password),
                email: bodyRequest.email,
                firstName: bodyRequest.first_name,
                lastName: bodyRequest.last_name,
                id: uuidv4(),
                role: "s"
            }

            // Create new User
            await userModel.create(newUser, (err: string, insertId: number) => {
                if (err) {
                    if (err.search("ER_DUP_ENTRY") > -1 && err.search("username") > -1) {
                        res.status(200).json({code: 101, message: `Username is exists.`});
                        return;
                    }
                    if (err.search("ER_DUP_ENTRY") > -1 && err.search("email") > -1) {
                        res.status(200).json({code: 102, message: `Email is already registered.`});
                        return;
                    }
                    res.status(200).json({code: 400, message: err});
                }else{
                    //Successful
                    res.status(200).json({code: 1, message: `Register successful.`});
                    return;
                }
            });

            break;
        default:
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}

const checkBodyParams = (body: any): boolean => {
    return !(!body.username || !body.password || !body.email || !body.last_name || !body.first_name);
}


