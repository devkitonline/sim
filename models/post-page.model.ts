import {EPostType} from "../helpers/enums";
import {query} from "@/lib/db/db";
import {RowDataPacket} from "mysql2";
import {ICategory, IFilterCondition, IPage, IPost, ITag} from "../helpers/interfaces";
import {queryFilter} from "../helpers/queryFilter";

const pageAllFieldsQuery = `SELECT pages.id,
                                   pages.title,
                                   pages.content,
                                   pages.excerpt,
                                   pages.status                                 as status_id,
                                   ps.name                                  as status_name,
                                   pages.date_created,
                                   pages.date_modified,
                                   pages.date_published,
                                   pages.format_type                            as format_type_id,
                                   ft.name                                  as format_type_name,
                                   pages.author                                 as author_id,
                                   CONCAT(u1.last_name, ' ', u1.first_name) as author,
                                   pages.publisher                              as publisher_id,
                                   CONCAT(u2.last_name, ' ', u2.first_name) as publisher,
                                   pages.slug,
                                   pages.image,
                                   pages.allow_comment,
                                   meta_description,
                                   meta_robots,
                                   meta_canonical,
                                   meta_og_locale,
                                   meta_og_site_name,
                                   meta_og_type,
                                   meta_og_title,
                                   meta_og_description,
                                   meta_og_url,
                                   meta_og_image,
                                   meta_og_image_secure_url,
                                   meta_og_image_width,
                                   meta_og_image_height,
                                   meta_article_published_time,
                                   meta_article_publisher,
                                   meta_twitter_card,
                                   meta_twitter_domain,
                                   meta_twitter_title,
                                   meta_twitter_description,
                                   meta_twitter_image,
                                   pages.date_indexed
                            FROM pages pages
                                     LEFT JOIN post_status ps ON pages.status = ps.id
                                     LEFT JOIN format_types ft ON pages.format_type = ft.id
                                     LEFT JOIN users u1 ON pages.author = u1.id
                                     LEFT JOIN users u2 ON pages.publisher = u2.id
                            WHERE pages.deleted = 0`;

const postAllFieldsQuery = `SELECT posts.id,
                                   posts.title,
                                   posts.content,
                                   posts.excerpt,
                                   posts.status                                 as status_id,
                                   ps.name                                  as status_name,
                                   posts.date_created,
                                   posts.date_modified,
                                   posts.date_published,
                                   posts.format_type                            as format_type_id,
                                   ft.name                                  as format_type_name,
                                   posts.author                                 as author_id,
                                   CONCAT(u1.last_name, ' ', u1.first_name) as author,
                                   posts.publisher                              as publisher_id,
                                   CONCAT(u2.last_name, ' ', u2.first_name) as publisher,
                                   posts.slug,
                                   posts.image,
                                   posts.allow_comment,
                                   meta_description,
                                   meta_robots,
                                   meta_canonical,
                                   meta_og_locale,
                                   meta_og_site_name,
                                   meta_og_type,
                                   meta_og_title,
                                   meta_og_description,
                                   meta_og_url,
                                   meta_og_image,
                                   meta_og_image_secure_url,
                                   meta_og_image_width,
                                   meta_og_image_height,
                                   meta_article_published_time,
                                   meta_article_publisher,
                                   meta_twitter_card,
                                   meta_twitter_domain,
                                   meta_twitter_title,
                                   meta_twitter_description,
                                   meta_twitter_image,
                                   posts.date_indexed
                            FROM posts posts
                                     LEFT JOIN post_status ps ON posts.status = ps.id
                                     LEFT JOIN format_types ft ON posts.format_type = ft.id
                                     LEFT JOIN users u1 ON posts.author = u1.id
                                     LEFT JOIN users u2 ON posts.publisher = u2.id
                            WHERE posts.deleted = 0`;

const findOne = (type: EPostType, id: string, callback: Function) => {
    let queryString = "";
    if (type == EPostType.page) {
        queryString = `${pageAllFieldsQuery} AND p.id = '${id}' `;
    } else {
        queryString = `${postAllFieldsQuery} AND p.id = '${id}' `;
    }

    query(queryString)
    .then(async (result) => {
        const row = <RowDataPacket[]>result[0];
        if (type == EPostType.page) {
            //set to Page object
            const page = setPage(row);
            // find the page's tags list
            page.tags = await getTagsOfPost(type, page.id);

            callback(null, page);
        } else {
            //set to Post object
            const post = setPost(row);
            //find its tags
            post.tags = await getTagsOfPost(type, post.id);
            //find its categories
            post.categories = await getCategoriesOfPost(post.id);

            callback(null, post);
        }
    })
    .catch(err => {
        callback(err);
    })
}

const findByFilters = (type: EPostType, filter: IFilterCondition, callback: Function) => {
    let queryString = "";
    if (type == EPostType.page) {
        const whereClause = queryFilter.buildSQLWhereClauseForGroup(filter, "pages");
        queryString = `${pageAllFieldsQuery} AND ${whereClause} LIMIT ${filter.offset} , ${filter.limit}`;
        console.log(queryString);
    } else {
        const whereClause = queryFilter.buildSQLWhereClauseForGroup(filter, "posts");
        queryString = `${postAllFieldsQuery} AND ${whereClause} LIMIT ${filter.offset} , ${filter.limit}`;
    }
    query(queryString)
    .then(async (result) => {
        const rows = <RowDataPacket[]>result;

        if (type == EPostType.page) {
            let pages: IPage[] = [];
            for (const row of rows) {
                //set to Page object
                const page = setPage(row);
                // find the page's tags list
                page.tags = await getTagsOfPost(type, page.id);

                pages.push(page);
            }

            callback(null, pages);
        } else {
            let posts: IPost[] = [];
            for (const row of rows) {
                //set to Post object
                const post = setPost(row);
                //find its tags
                post.tags = await getTagsOfPost(type, post.id);
                //find its categories
                post.categories = await getCategoriesOfPost(post.id);

                posts.push(post);
            }

            callback(null, posts);
        }
    })
    .catch(err => {
        callback(err);
    })
}

const _delete = (type: EPostType, id: string, callback:Function) => {
    let queryString = "";
    if (type == EPostType.post){
        queryString = `UPDATE posts SET deleted = 1 WHERE id = ?`;
    }else if (type == EPostType.page){
        queryString = `UPDATE pages SET deleted = 1 WHERE  id = ?`;
    }
    query(queryString, [id])
    .then(result => {
        callback(null);
    })
    .catch(err => {
        callback(err);
    })
}

export const postPageModel = {
    findOne,
    findByFilters,
    delete: _delete
}

//Helper functions
const getTagsOfPost = async (type: EPostType, postId: string): Promise<ITag[]> => {
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

    const result = await query(queryString, [postId]);

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

    return tags;
}

const getCategoriesOfPost = async (postId: string): Promise<ICategory[]> => {
    let queryString = `SELECT c.id, c.name, c.slug, c.description
                       FROM posts_categories pt
                                INNER JOIN categories c ON pt.category_id = c.id
                       WHERE pt.post_id = ?`;

    const result = await query(queryString, [postId]);

    const rows = <RowDataPacket[]>result;

    let categories: ICategory[] = [];

    rows.forEach(row => {
        const cate: ICategory = {
            id: row.id,
            name: row.name,
            description: row.description,
            slug: row.slug,
        }
        categories.push(cate);
    });

    return categories;
}

const setPage = (row: any): IPage => {
    // general information
    let p: IPage = {
        allowComment: row['allow_comment'] == 1,
        author: row['author'],
        authorId: row['author_id'],
        content: row['content'],
        dateCreated: row['date_created'],
        dateModified: row['date_modified'],
        datePublishes: row['date_published'],
        excerpt: row['excerpt'],
        formatType: row['format_type_name'],
        formatTypeId: row['format_type_id'],
        id: row['id'],
        image: row['image'],
        pageStatus: row['status_name'],
        pageStatusId: row['status_id'],
        publisher: row['publisher'],
        publisherId: row['publisher_id'],
        slug: row['slug'],
        title: row['title']
    }
    // meta data infomation
    p.SEOMetaData = {
        articlePublishedTime: row['meta_article_published_time'],
        articlePublisher: row['meta_article_publisher'],
        metaCanonical: row['meta_canonical'],
        metaDescription: row['meta_description'],
        metaRobots: row['meta_robots'],
        ogDescription: row['meta_og_description'],
        ogImage: row['meta_og_image'],
        ogImageHeight: row['meta_og_image_height'],
        ogImageSecureUrl: row['meta_og_image_secure_url'],
        ogImageWidth: row['meta_og_image_width'],
        ogLocale: row['meta_og_locale'],
        ogSiteName: row['meta_og_site_name'],
        ogTitle: row['meta_og_title'],
        ogType: row['meta_og_type'],
        ogUrl: row['meta_og_url'],
        twitterCard: row['meta_twitter_card'],
        twitterDescription: row['meta_twitter_description'],
        twitterDomain: row['meta_twitter_domain'],
        twitterImage: row['meta_twitter_image'],
        twitterTitle: row['meta_twitter_title']
    };
    return p;
}

const setPost = (row: any): IPost => {
    // general information
    let p: IPost = {
        allowComment: row['allow_comment'] == 1,
        author: row['author'],
        authorId: row['author_id'],
        content: row['content'],
        dateCreated: row['date_created'],
        dateModified: row['date_modified'],
        datePublishes: row['date_published'],
        excerpt: row['excerpt'],
        formatType: row['format_type_name'],
        formatTypeId: row['format_type_id'],
        id: row['id'],
        image: row['image'],
        pageStatus: row['status_name'],
        pageStatusId: row['status_id'],
        publisher: row['publisher'],
        publisherId: row['publisher_id'],
        slug: row['slug'],
        title: row['title']
    }
    // meta data infomation
    p.SEOMetaData = {
        articlePublishedTime: row['meta_article_published_time'],
        articlePublisher: row['meta_article_publisher'],
        metaCanonical: row['meta_canonical'],
        metaDescription: row['meta_description'],
        metaRobots: row['meta_robots'],
        ogDescription: row['meta_og_description'],
        ogImage: row['meta_og_image'],
        ogImageHeight: row['meta_og_image_height'],
        ogImageSecureUrl: row['meta_og_image_secure_url'],
        ogImageWidth: row['meta_og_image_width'],
        ogLocale: row['meta_og_locale'],
        ogSiteName: row['meta_og_site_name'],
        ogTitle: row['meta_og_title'],
        ogType: row['meta_og_type'],
        ogUrl: row['meta_og_url'],
        twitterCard: row['meta_twitter_card'],
        twitterDescription: row['meta_twitter_description'],
        twitterDomain: row['meta_twitter_domain'],
        twitterImage: row['meta_twitter_image'],
        twitterTitle: row['meta_twitter_title']
    };
    return p;
}
