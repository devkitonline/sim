import {IImage} from "../helpers/interfaces";
import {query} from "@/lib/db/db";
import Error from "next/error";

const create = async (image: IImage, callback: Function) => {
    const queryString = `INSERT INTO images (id, name, description, path, owner, public)
                         VALUES (?, ?, ?, ?, ?, ?)`;
    try {
        const result = await query(
            queryString,
            [
                image.id,
                image.name,
                image.description,
                image.path,
                image.ownerId,
                image.isPublic ? 1  : 0
            ],
        );
        //insert success
        callback(null);
    } catch (e) {
        const error = new Error(e.message);
        callback(error.props);
    }
}

export const imageModel = {
    create
}
