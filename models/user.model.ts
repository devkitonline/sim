import {OkPacket, RowDataPacket} from "mysql2";
import {query} from "@/lib/db/db";
import {IUsers} from "@/lib/utils/interfaces";
import Filter from 'bad-words';
import Error from "next/error";

const filter = new Filter();

export const create = async (user: IUsers, callback: Function) => {
    const queryString = `INSERT INTO users (id, username, pwd, email, first_name, last_name, role)
                         VALUES (?, ?, ?, ?, ?, ?, ?)`;
    try{
        const result: any = await query(
            queryString,
            [
                filter.clean(user.id),
                filter.clean(user.username),
                filter.clean(user.pwd),
                filter.clean(user.email),
                filter.clean(user.firstName),
                filter.clean(user.lastName),
                user.role
            ],
        );

        if (result.affectedRows > 0){
            const insertId = (<OkPacket> result).insertId;
            callback(null, insertId);
        }
    }catch (e) {
        const error = new Error(e.message);
        callback(error.props);
    }

}

export const findOne = (username: string, hash: string, callback: Function) => {
    const queryString = "SELECT id, username, pwd, email, first_name, last_name, role, is_admin  FROM users  WHERE username = ? AND pwd = ?";
    query(
        queryString,
        [username, hash]
    )
    .then(result => {
        const row = (<RowDataPacket> result)[0];
        const user: IUsers = {
            id: row.id,
            username: row.username,
            pwd: row.pwd,
            email: row.email,
            firstName: row.first_name,
            lastName: row.last_name,
            role: row.role,
            isAdmin: row.is_admin == 1
        }
        callback(null, user);
    })
    .catch(err => {
            callback(err);
    })
}

const findOneById = (id: string, callback: Function) => {

}
