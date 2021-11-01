import {query} from "@/lib/db/db";
import {OkPacket, RowDataPacket} from "mysql2";
import {ITag} from "helpers/interfaces";
import Error from "next/error";
import Filter from 'bad-words';
import {EPostType} from "../helpers/enums";

const filter = new Filter();

const findAll = (callback: Function) => {
    const queryString = `SELECT id, name, description
                         FROM tags`;
    query(queryString)
    .then(result => {
        const rows = <RowDataPacket[]>result;
        let tags: ITag[] = [];

        rows.forEach(row => {
            const tag: ITag = {
                id: row.id,
                name: row.name,
                description: row.description,
                slug: row.slug,
            }
            tags.push(tag);
        });

        callback(null, tags);
    })
    .catch(err => {
        callback(err);
    })
}

const findOne = (id: string, callback: Function) => {
    const queryString = `SELECT id, name, slug, description
                         FROM tags
                         WHERE id = ? `;
    query(
        queryString,
        [id]
    )
    .then(result => {
        const row = (<RowDataPacket>result)[0];
        const tag: ITag = {
            id: row.id,
            name: row.name,
            slug: row.slug,
            description: row.description
        }
        callback(null, tag);
    })
    .catch(err => {
        callback(err);
    })
}

const findOneByName = (name: string, callback: Function)=>{
    const queryString = `SELECT id, name, slug, description
                         FROM tags
                         WHERE name = ? `;
    query(
        queryString,
        [name]
    )
    .then(result => {
        const row = (<RowDataPacket>result)[0];
        const tag: ITag = {
            id: row.id,
            name: row.name,
            slug: row.slug,
            description: row.description
        }
        callback(null, tag);
    })
    .catch(err => {
        callback(err);
    })
}

const create = async (tag: ITag, callback: Function) => {
    const queryString = `INSERT INTO tags (id, name, slug, description)
                         VALUES (?, ?, ?, ?)`;
    try {
        const result: any = await query(
            queryString,
            [
                filter.clean(tag.id),
                filter.clean(tag.name),
                filter.clean(tag.slug),
                tag.description //because description is an optional param, filter.clean() function returnd null, so we catch error
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

const update = async (tag: ITag, callback: Function) => {
    const queryString = `UPDATE tags
                         SET name=?,
                             slug=?,
                             description=?
                         WHERE id = ?`;
    try {
        const result: any = await query(
            queryString,
            [
                tag.name,
                tag.slug,
                tag.description,
                tag.id
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

const _delete = (id: string, callback: Function) => {
    const queryString = `DELETE
                         FROM tags
                         WHERE id = ?`;
    query(queryString, [id])
    .then(result => {
        callback(null);
    })
    .catch(err => {
        callback(err);
    })
}

const findPostTags = (type: EPostType, postId: string, callback: Function) => {
    let queryString = "";
    if (type == EPostType.post) {
        queryString = `SELECT t.id, t.name, t.slug, t.description
                       FROM posts_tags pt
                                INNER JOIN tags t ON pt.tag_id = t.id
                       WHERE post_id = ?`;
    } else {
        queryString = `SELECT t.id, t.name, t.slug, t.description
                       FROM pages_tags pt
                                INNER JOIN tags t ON pt.tag_id = t.id
                       WHERE page_id = ?`;
    }

    query(queryString , [postId])
    .then(result => {
        const rows = <RowDataPacket[]>result;
        let tags: ITag[] = [];

        rows.forEach(row => {
            const tag: ITag = {
                id: row.id,
                name: row.name,
                description: row.description,
                slug: row.slug,
            }
            tags.push(tag);
        });

        callback(null, tags);
    })
    .catch(err => {
        callback(err);
    });
}

export const tagModel = {
    findAll,
    findOne,
    findPostTags,
    create,
    update,
    delete: _delete
}
