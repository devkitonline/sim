import {OkPacket, RowDataPacket} from "mysql2";
import {query} from "@/lib/db/db";
import {IUser} from "helpers/interfaces";
import Filter from 'bad-words';
import Error from "next/error";

const filter = new Filter();

const create = async (user: IUser, callback: Function) => {
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

const findOne = (username: string, hash: string, callback: Function) => {
    const queryString = `SELECT u.id,
                                u.username,
                                u.pwd,
                                u.email,
                                u.first_name,
                                u.last_name,
                                r.name as role,
                                r.id as role_id,
                                u.is_admin
                         FROM users u
                                  LEFT JOIN roles r ON u.role = r.id
                         WHERE u.username = ?
                           AND u.pwd = ?`;
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
            roleId: row.role_id,
            isAdmin: row.is_admin == 1
        }
        callback(null, user);
    })
    .catch(err => {
        callback(err);
    })
}

const findOneById = (id: string, callback: Function) => {
    const queryString = `SELECT u.id,
                                u.username,
                                u.pwd,
                                u.email,
                                u.first_name,
                                u.last_name,
                                r.name as role,
                                r.id as role_id,
                                u.is_admin
                         FROM users u
                                  LEFT JOIN roles r ON u.role = r.id
                         WHERE u.id = ? `;
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
            roleId: row.role_id,
            isAdmin: row.is_admin == 1
        }
        callback(null, user);
    })
    .catch(err => {
        callback(err);
    })
}

const findAll = (callback: Function) => {
    const queryString = `SELECT u.id,
                                u.username,
                                u.pwd,
                                u.first_name,
                                u.last_name,
                                u.email,
                                u.is_admin,
                                r.name as role
                         FROM users u
                                  LEFT JOIN roles r on u.role = r.id`;

    query(queryString)
    .then(result => {
        const rows = <RowDataPacket[]>result;
        let users: IUser[] = [];

        rows.forEach(row => {
            const user: IUser = {
                email: row.email,
                firstName: row.first_name,
                id: row.id,
                isAdmin: row.is_admin == 1,
                lastName: row.last_name,
                pwd: row.pwd,
                role: row.role,
                username: row.username
            }
            users.push(user);
        });

        callback(null, users);
    })
    .catch(err => {
        callback(err);
    })
}

const update = async (user: IUser, callback: Function) => {
    const queryString = `UPDATE users
                         SET email=?,
                             last_name=?,
                             first_name=?,
                             role=?,
                             date_modified= now()
                         WHERE id = ?`;
    try {
        const result: any = await query(
            queryString,
            [
                user.email,
                user.lastName,
                user.firstName,
                user.roleId,
                user.id
            ]
        );
        if (result.affectedRows > 0) {
            const updateId = (<OkPacket>result).insertId;
            callback(null, updateId);
        }
    } catch (e) {
        const error = new Error(e.message);
        callback(error.props);
    }
}

const updatePwd = (userId: string, newPwd: string, callback: Function) => {
    const queryString = `UPDATE users
                         SET pwd          = ?,
                             date_modified= now()
                         WHERE id = ?`;
    query(queryString,
        [newPwd, userId])
    .then(result => {
        callback(null);
    })
    .catch(err => {
        callback(err);
    })
}

export const userModel = {
    create,
    findOne,
    findOneById,
    findAll,
    update,
    updatePwd
}
