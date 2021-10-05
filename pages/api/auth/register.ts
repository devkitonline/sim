import {IUsers} from "@/lib/utils/interfaces";
import {query} from '@/lib/db/db';
import {v4 as uuidv4} from 'uuid';
import Filter from 'bad-words';
import Error from "next/error";

const filter = new Filter();
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

            const newUser: IUsers = {
                username: bodyRequest.username,
                pwd: bodyRequest.password,
                email: bodyRequest.email,
                firstName: bodyRequest.first_name,
                lastName: bodyRequest.last_name
            }

            const result = await registerUser(newUser);

            if (typeof result == "boolean" && result === true) {
                res.status(200).json({code: 1, message: `Register successful.`});
                return;

            } else if (typeof result == "string") {
                if (result.search("ER_DUP_ENTRY") > -1 && result.search("username") > -1) {
                    res.status(200).json({code: 101, message: `Username is exists.`});
                    return;
                }
                if (result.search("ER_DUP_ENTRY") > -1 && result.search("email") > -1) {
                    res.status(200).json({code: 102, message: `Email is already registered.`});
                    return;
                }
            }

            res.status(200).json({code: 103, message: `Expression parameter not all or error.`});

            break;
        default:
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}

const checkBodyParams = (body: any): boolean => {
    return !(!body.username || !body.password || !body.email || !body.last_name || !body.first_name);
}

const registerUser = async (user: IUsers): Promise<any> => {
    let result = null;

    const id = uuidv4();
    const role = 's'; //tạm thời để mặc định là subcriber
    const hash = md5(user.pwd);

    let queryString = "INSERT INTO users (id, username, pwd, email, first_name, last_name, role) VALUES (?,?,?,?,?,?,?)";
    try {
        const queryResult: any = await query(
            queryString,
            [
                filter.clean(id),
                filter.clean(user.username),
                filter.clean(hash),
                filter.clean(user.email),
                filter.clean(user.firstName),
                filter.clean(user.lastName),
                role
            ]
        )

        if (queryResult.affectedRows > 0)
            result = true;

    } catch (e) {
        const error = new Error(e.message);
        result = error.props;
    }

    return result;
}


