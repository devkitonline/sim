import {IMedia} from "../helpers/interfaces";
import {query} from "@/lib/db/db";
import Error from "next/error";
import {RowDataPacket} from "mysql2";

const create = async (media: IMedia, callback: Function) => {
    const queryString = `INSERT INTO media (id, name, description, path, owner, public, type)
                         VALUES (?, ?, ?, ?, ?, ?,?)`;
    try {
        const result = await query(
            queryString,
            [
                media.id,
                media.name,
                media.description,
                media.path,
                media.ownerId,
                media.isPublic ? 1  : 0,
                media.type
            ],
        );
        //insert success
        callback(null);
    } catch (e) {
        const error = new Error(e.message);
        callback(error.props);
    }
}

const findAllByOwner = (ownerId: string, callback: Function) => {
    const queryString = `SELECT i.id, i.name, i.description, i.path, i.owner, i.public, CONCAT(u.last_name , ' ', u.first_name) as owner_name, i.type
                         FROM media i
                        LEFT JOIN users u ON i.owner = u.id
                        WHERE owner = ?`;
    query(queryString, [ownerId])
    .then(result => {
        const rows = <RowDataPacket[]>result;
        let media: IMedia[] = [];
        rows.forEach(row => {
            media.push({
                description: row['description'],
                id: row['id'],
                isPublic: row['public'] == 1,
                name: row['name'],
                ownerId: row['owner'],
                ownerName: row['owner_name'],
                path: row['path'],
                type: row['type']
            })
        })

        callback(null, media);
    })
    .catch(err => {
        callback(err);
    })
}

const findAllPublic = (callback: Function) => {
    const queryString = `SELECT i.id, i.name, i.description, i.path, i.owner, i.public, CONCAT(u.last_name , ' ', u.first_name) as owner_name, i.type
                         FROM media i
                        LEFT JOIN users u ON i.owner = u.id
                        WHERE i.public = 1`;
    query(queryString)
    .then(result => {
        const rows = <RowDataPacket[]>result;
        let media: IMedia[] = [];
        rows.forEach(row => {
            media.push({
                description: row['description'],
                id: row['id'],
                isPublic: row['public'] == 1,
                name: row['name'],
                ownerId: row['owner'],
                ownerName: row['owner_name'],
                path: row['path'],
                type: row['type']
            })
        })

        callback(null, media);
    })
    .catch(err => {
        callback(err);
    })
}

export const mediaModel = {
    create,
    findAllByOwner,
    findAllPublic
}
