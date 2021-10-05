import {OkPacket, RowDataPacket} from "mysql2";
import {query} from "@/lib/db/db";
import {IUser} from "@/lib/utils/interfaces";
import Filter from 'bad-words';
import Error from "next/error";

const filter = new Filter();

export const create = async (user: IUser, callback: Function) => {
    const queryString = `INSERT INTO users (id, username, pwd, email, first_name, last_name, role)
                         VALUES (?, ?, ?, ?, ?, ?, ?)`;
    try {
        const result: any = await query(
            queryString,
            [
                filter.clean(user.id),
                filter.clean(user.username),
                filter.clean(user.pwd),
                filter.clean(user.email),
                filter.clean(user.firstName),
                filter.clean(user.lastName),
                filter.clean(user.role)
            ],
        );

        if (result.affectedRows > 0) {
            const insertId = (<OkPacket>result).insertId;
            callback(null, insertId);
        }
    } catch (e) {
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
        const row = (<RowDataPacket>result)[0];
        const user: IUser = {
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

export const findOneById = (id: string, callback: Function) => {
    const queryString = "SELECT id, username, pwd, email, first_name, last_name, role, is_admin  FROM users  WHERE id = ? ";
    query(
        queryString,
        [id]
    )
    .then(result => {
        const row = (<RowDataPacket>result)[0];
        const user: IUser = {
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

export const update = (user: IUser, callback: Function) => {
    const queryString = `UPDATE users
                         SET email=?,
                             pwd = ?,
                             last_name=?,
                             first_name=?,
                             role=?,
                             is_admin=?
                         WHERE id = ?`;
    query(
        queryString,
        [
            filter.clean(user.email),
            filter.clean(user.pwd),
            filter.clean(user.lastName),
            filter.clean(user.firstName),
            filter.clean(user.role),
            user.isAdmin ? 1 : 0,
            filter.clean(user.id)
        ]
    )
    .then(result => {
        callback(null);
    })
    .catch(err => {
        callback(err);
    })
}
