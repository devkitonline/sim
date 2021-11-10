import {query} from "@/lib/db/db";

export default async function apiHandler(req, res) {
    let data;
    data = await query(`select p.*, concat(first_name, ' ', last_name) as authorName
                        from posts p
                                 inner join posts_categories pc on p.id = pc.post_id
                                 inner join categories c on pc.category_id = c.id
                                 inner join users u on u.id = p.author
                        where c.id = ?
                        order by p.date_created desc
                        limit 17`, [req.body.id]);
    res.status(200).json({code: 1, message: `successfully`, data: data});
}
