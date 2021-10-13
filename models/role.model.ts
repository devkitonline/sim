import {query} from "@/lib/db/db";
import {RowDataPacket} from "mysql2";
import {IRole} from "helpers/interfaces";

const findAll = (callback: Function) =>{
    const queryString = `SELECT id, name, description
                         FROM roles`;
    query(queryString)
    .then(result => {
        const rows = <RowDataPacket[]>result;
        let roles: IRole[] = [];

        rows.forEach(row => {
            const role: IRole = {
                 id: row.id,
                name: row.name,
                description: row.description,
            }
            roles.push(role);
        });

        callback(null, roles);
    })
    .catch(err => {
        callback(err);
    })
}

export  const roleModel = {
    findAll
}
