import {IMenu} from "helpers/interfaces";
import {query} from "@/lib/db/db";
import {RowDataPacket} from "mysql2";
import Error from "next/error";

const findAll = (callback: Function) => {
    const queryString = `SELECT id, name, link, icon, parent_id, sort_order
                         FROM menus
                         ORDER BY id`;
    query(queryString)
    .then(result => {
        const rows = <RowDataPacket[]>result;
        let menus: IMenu[] = [];
        rows.forEach(row => {
            const menu: IMenu = {
                icon: row.icon,
                link: row.link,
                orderSort: row.sort_order,
                id: row.id,
                name: row.name,
                parentId: row.parent_id,
                children: []
            }

            if (menu.parentId) {
                //Find parent menu
                const parentIndex = menus.findIndex(m => m.id == menu.parentId);
                if (parentIndex > -1) {
                    menus[parentIndex].children.push(menu);
                }
            } else {
                menus.push(menu);
            }
        });

        callback(null, menus);
    })
    .catch(err => {
        console.log(err);
        callback(err);
    })
}


const create = async (menus: IMenu[], callback: Function) => {
    ///////////////////////////////////////////NOTES/////////////////////////////////////////
    // Cannot delete or update a parent row: a foreign key constraint fails
    // SO, WE HAVE TO DROP FOREIGN KEY fk_menu_menu FIRST
    try {
        const dropFKResult = await query(`ALTER TABLE menus
            DROP FOREIGN KEY fk_menu_menu`);
    } catch (e) { //Drop Fk fails
        callback("Cannot delete or update a parent row: a foreign key constraint fails");
    }
    // Drop FK successful, then
    //Delete all rows in table
    const deleteQuery = `DELETE
                         FROM menus`;

    query(deleteQuery)
    .then(async (result) => { //Delete successful
        let insertQuery = `INSERT INTO menus (id, name, link, icon, parent_id, sort_order)
                           VALUES `;
        // Build query
        let valuesQueryArray = [];
        for (let menu of menus) {
            valuesQueryArray.push(generateInsertValuesSQLQuery(menu));
        }
        let valuesQuery = valuesQueryArray.join(" , ");

        //Execute query
        try {
            const insertRes: any = await query(
                `${insertQuery} ${valuesQuery}`
            );

            // INSERT successful, then ADD FOREIGN KEY
            const addFKResult = await query(`ALTER TABLE menus
                ADD CONSTRAINT fk_menu_menu FOREIGN KEY (parent_id) REFERENCES menus (id);`);

            callback(null);

        } catch (e) { //Can't insert rows
            console.log(e);
            const error = new Error(e.message);
            callback(error.props);
        }

    })
    .catch(err => { //Can't delete all rows
        callback(err);
    });
}

/* Helper function */
const generateInsertValuesSQLQuery = (menu: IMenu): string => {
    let valuesArray = [];

    if (menu.children.length > 0) {
        for (let child of menu.children) {
            let query = generateInsertValuesSQLQuery(child);
            valuesArray.push(query);
        }
    }

    let menuQuery = `(${menu.id} , '${menu.name}', '${menu.link}' , '${menu.icon}', ${menu.parentId ? menu.parentId : null}, '${menu.orderSort}' )`;
    valuesArray.push(menuQuery);

    return valuesArray.join(' , ');
}


export const menuModel = {
    findAll,
    create
}
