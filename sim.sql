############ Tạo bảng dữ liệu ############

CREATE TABLE categories(
                        id varchar(255) primary key ,
                        name varchar(255) not null ,
                        slug varchar(255) not null unique ,
                        parent_id varchar(255) ,
                        description longtext,
                        image longtext
);

create table tags(
    id varchar(255) primary key ,
    name varchar(255) not null ,
    slug varchar(255) not null unique ,
    description longtext
);

create table users
(
    id varchar(255) primary key ,
    username varchar(255) not null unique ,
    pwd varchar(255) not null ,
    email varchar(255) unique ,
    first_name varchar(255),
    last_name varchar(255),
    role varchar(255) not null ,
    is_admin tinyint default 0 not null,
    date_created datetime not null default  now(),
    date_modified datetime not null default  now(),
    avatar_path varchar(255)
);

create table roles
(
    id varchar(255) primary key ,
    name varchar(255) not null ,
    description longtext
);

create table post_status
(
    id   varchar(255) primary key,
    name varchar(255) not null
);

create table format_types(
    id varchar(255) primary key ,
    name varchar(255) not null
);

create table posts(
    id varchar(255) primary key ,
    title varchar(255) not null ,
    content longtext,
    excerpt varchar(255),
    status varchar(255),
    date_created datetime default  now(),
    date_modified datetime,
    date_published datetime,
    date_indexed datetime,
    format_type varchar(255),
    author varchar(255) not null ,
    publisher varchar(255) ,
    slug varchar(255) not null unique ,
    image longtext ,
    allow_comment tinyint default 0,
    meta_description varchar(255),
    meta_robots varchar(255),
    meta_canonical varchar(255),
    meta_og_locale varchar(255),
    meta_og_site_name varchar(255),
    meta_og_type varchar(255),
    meta_og_title varchar(255),
    meta_og_description varchar(255),
    meta_og_url varchar(255),
    meta_og_image varchar(255),
    meta_og_image_secure_url varchar(255),
    meta_og_image_width varchar(255),
    meta_og_image_height varchar(255),
    meta_article_published_time varchar(255),
    meta_article_publisher varchar(255),
    meta_twitter_card varchar(255),
    meta_twitter_domain varchar(255),
    meta_twitter_title varchar(255),
    meta_twitter_description varchar(255),
    meta_twitter_image varchar(255),
    deleted tinyint default  0
);

create table pages(
                      id varchar(255) primary key ,
                      title varchar(255) not null ,
                      content longtext,
                      excerpt varchar(255),
                      status varchar(255),
                      date_created datetime default  now(),
                      date_modified datetime,
                      date_published datetime,
                      date_indexed datetime,
                      format_type varchar(255),
                      author varchar(255) not null ,
                      publisher varchar(255) ,
                      slug varchar(255) not null unique ,
                      image longtext ,
                      allow_comment tinyint default 0,
                      meta_description varchar(255),
                      meta_robots varchar(255),
                      meta_canonical varchar(255),
                      meta_og_locale varchar(255),
                      meta_og_site_name varchar(255),
                      meta_og_type varchar(255),
                      meta_og_title varchar(255),
                      meta_og_description varchar(255),
                      meta_og_url varchar(255),
                      meta_og_image varchar(255),
                      meta_og_image_secure_url varchar(255),
                      meta_og_image_width varchar(255),
                      meta_og_image_height varchar(255),
                      meta_article_published_time varchar(255),
                      meta_article_publisher varchar(255),
                      meta_twitter_card varchar(255),
                      meta_twitter_domain varchar(255),
                      meta_twitter_title varchar(255),
                      meta_twitter_description varchar(255),
                      meta_twitter_image varchar(255),
                      deleted tinyint default  0
);

create table posts_categories
(
    post_id varchar(255),
    category_id varchar(255),
    primary key (post_id, category_id)
);

create table posts_tags
(
    post_id varchar(255),
    tag_id varchar(255),
    primary key (post_id, tag_id)
);

create table pages_tags
(
    page_id varchar(255),
    tag_id varchar(255),
    primary key (page_id, tag_id)
);

create table comments_status
(
    id varchar(255) primary key ,
    name varchar(255) not null
);

create table comments
(
    id varchar(255) primary key ,
    post_id varchar(255)  ,
    page_id varchar(255),
    content longtext,
    date_created datetime not null ,
    user_id varchar(255) not null ,
    status varchar(255) not null ,
    parent_id varchar(255)
);

# THÊM BẢNG MENUS
create table menus
(
    id        int primary key,
    name      varchar(255),
    link      varchar(255),
    icon      varchar(255),
    parent_id int,
    sort_order int default 0
);

############ Ràng buộc khóa ngoại ############

ALTER TABLE categories ADD CONSTRAINT fk_category_category FOREIGN KEY (parent_id) REFERENCES categories(id);

ALTER TABLE users ADD CONSTRAINT fk_user_role FOREIGN KEY (role) REFERENCES roles(id);

ALTER TABLE posts ADD CONSTRAINT fk_post_status FOREIGN KEY (status) REFERENCES post_status(id);

ALTER TABLE posts ADD CONSTRAINT fk_post_formattype FOREIGN KEY (format_type) REFERENCES format_types(id);

ALTER TABLE posts ADD CONSTRAINT fk_post_author FOREIGN KEY (author) REFERENCES users(id);

ALTER TABLE posts ADD CONSTRAINT fk_post_publisher FOREIGN KEY (publisher) REFERENCES users(id);

ALTER TABLE pages ADD CONSTRAINT fk_page_status FOREIGN KEY (status) REFERENCES post_status(id);

ALTER TABLE pages ADD CONSTRAINT fk_page_formattype FOREIGN KEY (format_type) REFERENCES format_types(id);

ALTER TABLE pages ADD CONSTRAINT fk_page_author FOREIGN KEY (author) REFERENCES users(id);

ALTER TABLE pages ADD CONSTRAINT fk_page_publisher FOREIGN KEY (publisher) REFERENCES users(id);

ALTER TABLE posts_categories ADD CONSTRAINT fk_postcategory_post FOREIGN KEY (post_id) REFERENCES posts(id);

ALTER TABLE posts_categories ADD CONSTRAINT fk_postcategory_category FOREIGN KEY (category_id) REFERENCES categories(id);

ALTER TABLE posts_tags ADD CONSTRAINT fk_posttag_post FOREIGN KEY (post_id) REFERENCES posts(id);

ALTER TABLE posts_tags ADD CONSTRAINT fk_posttag_tag FOREIGN KEY (tag_id) REFERENCES tags(id);

ALTER TABLE pages_tags ADD CONSTRAINT fk_pagetag_tag FOREIGN KEY (tag_id) REFERENCES tags(id);

ALTER TABLE pages_tags ADD CONSTRAINT fk_pagetag_page FOREIGN KEY (page_id) REFERENCES pages(id);

ALTER TABLE comments ADD CONSTRAINT fk_comment_post FOREIGN KEY (post_id) REFERENCES posts(id);

ALTER TABLE comments ADD CONSTRAINT fk_comment_page FOREIGN KEY (page_id) REFERENCES pages(id);

ALTER TABLE comments ADD CONSTRAINT fk_comment_user FOREIGN KEY (user_id) REFERENCES users(id);

ALTER TABLE comments ADD CONSTRAINT fk_comment_comment FOREIGN KEY (parent_id) REFERENCES comments(id);

ALTER TABLE comments ADD CONSTRAINT fk_comment_status FOREIGN KEY (status) REFERENCES comments_status(id);

ALTER TABLE menus ADD CONSTRAINT fk_menu_menu FOREIGN KEY (parent_id) REFERENCES menus(id);

#################### Dữ liệu đầu tiên ################

# VAI TRÒ USER
INSERT INTO roles (id, name, description)
VALUES
('s', 'Subscriber', 'Subscriber'),
('m', 'Member' , 'Member'),
('w', 'Writer', 'Writer'),
('e', 'Editor', 'Editor'),
('a', 'Admin', 'Admin');

# TRẠNG THÁI BÀI POST
INSERT INTO post_status (id, name)
VALUES
('d', 'Draft'),
('p', 'Published' ),
('w', 'Waiting for publish'),
('h', 'Hidden'),
('s', 'Schedule');

# FORMAT TYPE
INSERT INTO format_types (id, name)
VALUES
('p', 'Post'),
('i', 'Image' ),
('g', 'Gallery'),
('v', 'Video'),
('a', 'Audio');

# TRẠNG THÁI COMMENT
INSERT INTO comments_status (id, name)
VALUES
('w', 'Waiting for approved'),
('a', 'Approved' );

# THÊM BẢNG IMAGES
create table images
(
    id varchar(255) primary key ,
    name varchar(255),
    description varchar(255),
    path varchar(255) not null ,
    owner varchar(255),
    public tinyint default 0
);
ALTER TABLE images
    ADD CONSTRAINT fk_image_user FOREIGN KEY (owner) REFERENCES users (id);

# THÊM BẢNG MEDIA
create table media
(
    id varchar(255) primary key ,
    name varchar(255),
    description varchar(255),
    path varchar(255) not null ,
    owner varchar(255),
    public tinyint default 0,
    type varchar(255)
);
ALTER TABLE media
    ADD CONSTRAINT fk_media_user FOREIGN KEY (owner) REFERENCES users (id);
