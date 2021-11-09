import fs from "fs";
import {query} from "@/lib/db/db";

var excerptHtml = require('excerpt-html');

export default async function apiHandler(req, res) {
    let data = [];
    const posts = await query("select * from wp_posts where post_type='post' order by post_date");
    for (const [k, post] of Object.entries(posts)) {
        if (post.post_title != 'Auto Draft') {
            let item = {
                id: post.ID,
                title: post.post_title,
                excerpt: excerptHtml(post.post_content, {pruneLength: 255}),
                content: post.post_content,
                status: 'p',
                date_created: new Date(post.post_date).toISOString().split('T')[0] + ' 00:00:00',
                date_modified: new Date(post.post_date).toISOString().split('T')[0] + ' 00:00:00',
                date_published: new Date(post.post_date).toISOString().split('T')[0] + ' 00:00:00',
                format_type: 'p',
                slug: post.post_name,
                author:post.post_author,
                publisher:post.post_author
            }
            const image = await query(`select *
                                       from wp_posts
                                       where post_type = 'attachment'
                                         and post_status = 'inherit'
                                         and post_parent = '${post.ID}'`);
            // @ts-ignore
            if (image.length > 0) {
                item['image'] = image[0].guid;
            }

            item['categories'] = await query(`select slug
                                              from wp_terms
                                                       inner join wp_term_taxonomy on wp_terms.term_id = wp_term_taxonomy.term_id
                                                       inner join wp_term_relationships on wp_term_relationships.term_taxonomy_id = wp_term_taxonomy.term_taxonomy_id
                                              where object_id = ${post.ID}
                                                and taxonomy = 'category'`);

            item['tags'] = await query(`select name
                                        from wp_terms
                                                 inner join wp_term_taxonomy on wp_terms.term_id = wp_term_taxonomy.term_id
                                                 inner join wp_term_relationships on wp_term_relationships.term_taxonomy_id = wp_term_taxonomy.term_taxonomy_id
                                        where object_id = ${post.ID}
                                          and taxonomy = 'post_tag'`);



            data.push(item);
        }
    }
    fs.writeFileSync(`./public/migrate.json`, JSON.stringify(data));
    res.status(200).json(data);
}
