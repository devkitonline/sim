import {EPostType} from "../helpers/enums";
import {query} from "@/lib/db/db";
import {RowDataPacket} from "mysql2";
import {ICategory, IPage, IPost, ITag} from "../helpers/interfaces";

const pageAllFieldsQuery = `SELECT p.id,
                                   p.title,
                                   p.content,
                                   p.excerpt,
                                   p.status                                 as status_id,
                                   ps.name                                  as status_name,
                                   p.date_created,
                                   p.date_modified,
                                   p.date_published,
                                   p.format_type                            as format_type_id,
                                   ft.name                                  as format_type_name,
                                   p.author                                 as author_id,
                                   CONCAT(u1.last_name, ' ', u1.first_name) as author,
                                   p.publisher                              as publisher_id,
                                   CONCAT(u2.last_name, ' ', u2.first_name) as publisher,
                                   p.slug,
                                   p.image,
                                   p.allow_comment,
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
                                   p.date_indexed
                            FROM pages p
                                     LEFT JOIN post_status ps ON p.status = ps.id
                                     LEFT JOIN format_types ft ON p.format_type = ft.id
                                     LEFT JOIN users u1 ON p.author = u1.id
                                     LEFT JOIN users u2 ON p.publisher = u2.id
                            WHERE p.deleted = 0`;

const postAllFieldsQuery = `SELECT p.id,
                                   p.title,
                                   p.content,
                                   p.excerpt,
                                   p.status                                 as status_id,
                                   ps.name                                  as status_name,
                                   p.date_created,
                                   p.date_modified,
                                   p.date_published,
                                   p.format_type                            as format_type_id,
                                   ft.name                                  as format_type_name,
                                   p.author                                 as author_id,
                                   CONCAT(u1.last_name, ' ', u1.first_name) as author,
                                   p.publisher                              as publisher_id,
                                   CONCAT(u2.last_name, ' ', u2.first_name) as publisher,
                                   p.slug,
                                   p.image,
                                   p.allow_comment,
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
                                   p.date_indexed
                            FROM posts p
                                     LEFT JOIN post_status ps ON p.status = ps.id
                                     LEFT JOIN format_types ft ON p.format_type = ft.id
                                     LEFT JOIN users u1 ON p.author = u1.id
                                     LEFT JOIN users u2 ON p.publisher = u2.id
                            WHERE p.deleted = 0`;

const findAll = (type: EPostType, callback: Function) => {
    callback(true);
}

const findOne =  (type: EPostType, id: string, callback: Function) => {
    let queryString = "";
    if (type == EPostType.page) {
        queryString = `${pageAllFieldsQuery} AND p.id = '${id}' `;
    } else {
        queryString = `${postAllFieldsQuery} AND p.id = '${id}' `;
    }

    query(queryString)
    .then(  (result) => {
        const rows = <RowDataPacket[]>result;
        let list = [];

        if (type == EPostType.page) {
            rows.forEach(async (row) => {
                //set to Page object
                const page = setPage(row);
                // find the page's tags list
                page.tags = await getTagsOfPost(type, page.id);
                //push to list
                list.push(page);
            });

        } else {
            rows.forEach( async (row) => {
                //set to Post object
                const post = setPost(row);
                //find its tags
                post.tags = await getTagsOfPost(type, post.id);
                //find its categories
                post.categories = await getCategoriesOfPost(post.id);
                //push to list
                list.push(setPost(row));
            });
        }

        callback(null, list);
    })
    .catch(err => {
        callback(err);
    })
}



const findOneBySlug = (slug: string, callback: Function) => {

}

//tags helper
const getTagsOfPost = async (type: EPostType, postId: string): Promise<ITag[]>=> {
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

    const result =  await query(queryString, [postId]);

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

// tags helper
const getCategoriesOfPost = async (postId: string): Promise<ICategory[]> => {
    let queryString = `SELECT c.id, c.name, c.slug, c.description
                       FROM posts_categories pt
                                INNER JOIN categories c ON pt.category_id = c.id
                       WHERE pt.post_id = ?`;

    const result =  await query(queryString, [postId]);

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

const setPage = (row: any) : IPage => {
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

export const postPageModel = {
    findAll,
    findOne,
    findOneBySlug
}
