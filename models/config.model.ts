import {query} from "@/lib/db/db";
import {RowDataPacket} from "mysql2";

const create = async (category: string, name: string, value: string) => {
    const conf = findOne(category, name);
    if (!conf){
        await query(`UPDATE config SET value = ? WHERE  category = ? AND name = ?`, [value, category, name]);
    }else{
        await query(`INSERT INTO config(category, name, value) VALUE (?, ?, ?) `, [category, name, value]);
    }
}

const findOne = async (category: string, name: string) => {
    const result = await query(`SELECT * FROM config WHERE category = ? AND name = ?`, [category, name]);
    return (<RowDataPacket>result)[0];
}

const findAllByCategory = async (category: string) =>{
    const result = await query(`SELECT * FROM config WHERE category = ?`, [category]);
    return (<RowDataPacket[]>result);
}

export const configModel = {
    create,
    findOne,
    findAllByCategory
}
