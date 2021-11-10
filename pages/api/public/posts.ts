import {query} from "@/lib/db/db";

export default async function apiHandler(req, res) {
    let data;
    data = await query("select * from posts order by date_created desc limit 22");
    // @ts-ignore
    if (data.length > 0) data = data[0];
    res.status(200).json({code: 1, message: `successfully`, data: data});
}
