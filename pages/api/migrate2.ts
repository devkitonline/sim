import data from './migrate.json';
import {query} from "@/lib/db/db";
import {v4 as uuidv4} from 'uuid';

export default async function apiHandler(req, res) {
    for (const [k, post] of Object.entries(data)) {
        const test = await query(`select * from posts where id='${post.id}'`);
        // @ts-ignore
        if(test.length>0) continue;

        const queryString = `INSERT INTO posts (id, title, content, excerpt, status, format_type, author, publisher, slug, image, date_modified, date_created, date_published)
                             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) `;
        await query(queryString, [
                post.id,
                post.title,
                post.content.replaceAll('https://simplyinvest.vn/', '/'),
                post.excerpt,
                post.status,
                post.format_type,
                post.author,
                post.publisher,
                post.slug,
                post.image ? post.image.replace('https://simplyinvest.vn/', '/') : '',
                post.date_modified,
                post.date_created,
                post.date_published
            ]
        );

        await query(`delete from posts_categories where post_id=?`,[post.id]);
        for (const [ck, category] of Object.entries(post.categories)) {
            await query(`insert into posts_categories(post_id, category_id)
                         values (?, ?)`, [post.id, category.slug]);
        }

        await query(`delete from posts_tags where post_id=?`,[post.id]);
        for (const [tk, tag] of Object.entries(post.tags)) {
            const tagId = await query(`select id
                                       from tags
                                       where name = '${tag.name}'`);
            // @ts-ignore
            if (tagId.length > 0) {
                await query(`insert into posts_tags(post_id, tag_id)
                             values (?, ?)`, [post.id, tagId[0].id]);
            } else {
                const id = uuidv4();
                await query(`insert into tags(id, name, slug, description)
                             values (?, ?, ?, ?)`, [id, tag.name, '', '']);
                await query(`insert into posts_tags(post_id, tag_id)
                             values (?, ?)`, [post.id, id]);
            }
        }
    }
    res.status(200).json(data);
}
