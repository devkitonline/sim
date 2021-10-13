import {ICategory} from "helpers/interfaces";
import {query} from "@/lib/db/db";
import {OkPacket, RowDataPacket} from "mysql2";
import Error from "next/error";

const findAll = (callback: Function) => {
    const queryString = `SELECT id, name, slug, parent_id, description, image
                         FROM categories`;
    query(queryString)
    .then(result => {
        const rows = <RowDataPacket[]>result;
        let categories: ICategory[] = [];

        rows.forEach(row => {
            const cate: ICategory = {
                id: row.id,
                name: row.name,
                description: row.description,
                slug: row.slug,
                image: row.image,
                categoryParent: row.parent_id
            }
            categories.push(cate);
        });

        callback(null, categories);
    })
    .catch(err => {
        callback(err);
    })
}

const findOne = (id: string, callback:Function) => {
    const queryString = `SELECT id, name, slug, parent_id, description, image
                         FROM categories 
                         WHERE id = ? `;
    query(
        queryString,
        [id]
    )
    .then(result => {
        const row = (<RowDataPacket>result)[0];
        const cate: ICategory = {
            id: row.id,
            name: row.name,
            description: row.description,
            slug: row.slug,
            image: row.image,
            categoryParent: row.parent_id
        }
        callback(null, cate);
    })
    .catch(err => {
        callback(err);
    })
}

const findChildren = (parentId: string, callback: Function) => {
    const queryString = `SELECT id, name, slug, parent_id, description, image
                         FROM categories WHERE parent_id = ?`;
    query(queryString, [parentId])
    .then(result => {
        const rows = <RowDataPacket[]>result;
        let categories: ICategory[] = [];

        rows.forEach(row => {
            const cate: ICategory = {
                id: row.id,
                name: row.name,
                description: row.description,
                slug: row.slug,
                image: row.image,
                categoryParent: row.parent_id
            }
            categories.push(cate);
        });

        callback(null, categories);
    })
    .catch(err => {
        callback(err);
    })
}

const create = async (category: ICategory, callback: Function) => {
    const queryString = `INSERT INTO categories (id, name, slug, parent_id, description, image)
                         VALUES (?, ?, ?, ?,? , ?)`;
    try {
        const result: any = await query(
            queryString,
            [
                category.id,
                category.name,
                category.slug,
                category.categoryParent,
                category.description,
                category.image
            ],
        );
        callback(null);
    } catch (e) {
        const error = new Error(e.message);
        callback(error.props);
    }
}

const update = async (category: ICategory, callback: Function) => {
    const queryString = `UPDATE categories
                         SET name = ?, slug = ?, description = ? , parent_id = ?, image = ?
                         WHERE id = ?`;
    try {
        const result: any = await query(
            queryString,
            [
                category.name,
                category.slug,
                category.description,
                category.categoryParent,
                category.image,
                category.id
            ]
        );

        callback(null);
    } catch (e) {
        const error = new Error(e.message);
        callback(error.props);
    }
}

const _delete = (id: string, callback:Function) => {
    const queryString = `DELETE
                         FROM categories
                         WHERE id = ?`;
    query(queryString, [id])
    .then(result => {
        callback(null);
    })
    .catch(err => {
        callback(err);
    })
}

export const categoryModel = {
    findAll,
    findOne,
    findChildren,
    create,
    update,
    delete: _delete
}
