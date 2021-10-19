-- MySQL dump 10.13  Distrib 5.7.26, for osx10.10 (x86_64)
--
-- Host: 127.0.0.1    Database: sim
-- ------------------------------------------------------
-- Server version	5.7.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `parent_id` varchar(255) DEFAULT NULL,
  `description` longtext,
  `image` longtext,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `fk_category_category` (`parent_id`),
  CONSTRAINT `fk_category_category` FOREIGN KEY (`parent_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES ('c5504e1a-b44e-440d-8f59-2638baf55ead','Khoa học tự nhiên','Khoa-hoc-tu-nhien',NULL,'','');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comments` (
  `id` varchar(255) NOT NULL,
  `post_id` varchar(255) DEFAULT NULL,
  `page_id` varchar(255) DEFAULT NULL,
  `content` longtext,
  `date_created` datetime NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `parent_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_comment_post` (`post_id`),
  KEY `fk_comment_page` (`page_id`),
  KEY `fk_comment_user` (`user_id`),
  KEY `fk_comment_comment` (`parent_id`),
  KEY `fk_comment_status` (`status`),
  CONSTRAINT `fk_comment_comment` FOREIGN KEY (`parent_id`) REFERENCES `comments` (`id`),
  CONSTRAINT `fk_comment_page` FOREIGN KEY (`page_id`) REFERENCES `pages` (`id`),
  CONSTRAINT `fk_comment_post` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`),
  CONSTRAINT `fk_comment_status` FOREIGN KEY (`status`) REFERENCES `comments_status` (`id`),
  CONSTRAINT `fk_comment_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments_status`
--

DROP TABLE IF EXISTS `comments_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comments_status` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments_status`
--

LOCK TABLES `comments_status` WRITE;
/*!40000 ALTER TABLE `comments_status` DISABLE KEYS */;
INSERT INTO `comments_status` VALUES ('a','Approved'),('w','Waiting for approved');
/*!40000 ALTER TABLE `comments_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `format_types`
--

DROP TABLE IF EXISTS `format_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `format_types` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `format_types`
--

LOCK TABLES `format_types` WRITE;
/*!40000 ALTER TABLE `format_types` DISABLE KEYS */;
INSERT INTO `format_types` VALUES ('a','Audio'),('g','Gallery'),('i','Image'),('p','Post'),('v','Video');
/*!40000 ALTER TABLE `format_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menus`
--

DROP TABLE IF EXISTS `menus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `menus` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `sort_order` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_menu_menu` (`parent_id`),
  CONSTRAINT `fk_menu_menu` FOREIGN KEY (`parent_id`) REFERENCES `menus` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menus`
--

LOCK TABLES `menus` WRITE;
/*!40000 ALTER TABLE `menus` DISABLE KEYS */;
INSERT INTO `menus` VALUES (0,'Trang chủ 2','/','fa fa-user',NULL,0),(1,'Tin tức 2','/tin-tuc','fa fa-user',NULL,0),(2,'Tin tức trong nước 2','/tin-trong-nuoc','',1,0),(3,'Tin ngoài nước 2','/tin-ngoai-nuoc','',1,1);
/*!40000 ALTER TABLE `menus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pages`
--

DROP TABLE IF EXISTS `pages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pages` (
  `id` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` longtext,
  `excerpt` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `date_created` datetime DEFAULT NULL,
  `date_modified` datetime DEFAULT NULL,
  `date_published` datetime DEFAULT NULL,
  `format_type` varchar(255) DEFAULT NULL,
  `author` varchar(255) NOT NULL,
  `publisher` varchar(255) DEFAULT NULL,
  `slug` varchar(255) NOT NULL,
  `image` longtext,
  `allow_comment` tinyint(4) DEFAULT '0',
  `meta_description` varchar(255) DEFAULT NULL,
  `meta_robots` varchar(255) DEFAULT NULL,
  `meta_canonical` varchar(255) DEFAULT NULL,
  `meta_og_locale` varchar(255) DEFAULT NULL,
  `meta_og_site_name` varchar(255) DEFAULT NULL,
  `meta_og_type` varchar(255) DEFAULT NULL,
  `meta_og_title` varchar(255) DEFAULT NULL,
  `meta_og_description` varchar(255) DEFAULT NULL,
  `meta_og_url` varchar(255) DEFAULT NULL,
  `meta_og_image` varchar(255) DEFAULT NULL,
  `meta_og_image_secure_url` varchar(255) DEFAULT NULL,
  `meta_og_image_width` varchar(255) DEFAULT NULL,
  `meta_og_image_height` varchar(255) DEFAULT NULL,
  `meta_article_published_time` varchar(255) DEFAULT NULL,
  `meta_article_publisher` varchar(255) DEFAULT NULL,
  `meta_twitter_card` varchar(255) DEFAULT NULL,
  `meta_twitter_domain` varchar(255) DEFAULT NULL,
  `meta_twitter_title` varchar(255) DEFAULT NULL,
  `meta_twitter_description` varchar(255) DEFAULT NULL,
  `meta_twitter_image` varchar(255) DEFAULT NULL,
  `date_indexed` datetime DEFAULT NULL,
  `deleted` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `fk_page_status` (`status`),
  KEY `fk_page_formattype` (`format_type`),
  KEY `fk_page_author` (`author`),
  KEY `fk_page_publisher` (`publisher`),
  CONSTRAINT `fk_page_author` FOREIGN KEY (`author`) REFERENCES `users` (`id`),
  CONSTRAINT `fk_page_formattype` FOREIGN KEY (`format_type`) REFERENCES `format_types` (`id`),
  CONSTRAINT `fk_page_publisher` FOREIGN KEY (`publisher`) REFERENCES `users` (`id`),
  CONSTRAINT `fk_page_status` FOREIGN KEY (`status`) REFERENCES `post_status` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pages`
--

LOCK TABLES `pages` WRITE;
/*!40000 ALTER TABLE `pages` DISABLE KEYS */;
/*!40000 ALTER TABLE `pages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pages_tags`
--

DROP TABLE IF EXISTS `pages_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pages_tags` (
  `page_id` varchar(255) NOT NULL,
  `tag_id` varchar(255) NOT NULL,
  PRIMARY KEY (`page_id`,`tag_id`),
  KEY `fk_pagetag_tag` (`tag_id`),
  CONSTRAINT `fk_pagetag_page` FOREIGN KEY (`page_id`) REFERENCES `pages` (`id`),
  CONSTRAINT `fk_pagetag_tag` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pages_tags`
--

LOCK TABLES `pages_tags` WRITE;
/*!40000 ALTER TABLE `pages_tags` DISABLE KEYS */;
/*!40000 ALTER TABLE `pages_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_status`
--

DROP TABLE IF EXISTS `post_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `post_status` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_status`
--

LOCK TABLES `post_status` WRITE;
/*!40000 ALTER TABLE `post_status` DISABLE KEYS */;
INSERT INTO `post_status` VALUES ('d','Draft'),('h','Hidden'),('p','Published'),('s','Schedule'),('w','Waiting for publish');
/*!40000 ALTER TABLE `post_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `posts` (
  `id` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` longtext,
  `excerpt` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `date_created` datetime DEFAULT NULL,
  `date_modified` datetime DEFAULT NULL,
  `date_published` datetime DEFAULT NULL,
  `format_type` varchar(255) DEFAULT NULL,
  `author` varchar(255) NOT NULL,
  `publisher` varchar(255) DEFAULT NULL,
  `slug` varchar(255) NOT NULL,
  `image` longtext,
  `allow_comment` tinyint(4) DEFAULT '0',
  `meta_description` varchar(255) DEFAULT NULL,
  `meta_robots` varchar(255) DEFAULT NULL,
  `meta_canonical` varchar(255) DEFAULT NULL,
  `meta_og_locale` varchar(255) DEFAULT NULL,
  `meta_og_site_name` varchar(255) DEFAULT NULL,
  `meta_og_type` varchar(255) DEFAULT NULL,
  `meta_og_title` varchar(255) DEFAULT NULL,
  `meta_og_description` varchar(255) DEFAULT NULL,
  `meta_og_url` varchar(255) DEFAULT NULL,
  `meta_og_image` varchar(255) DEFAULT NULL,
  `meta_og_image_secure_url` varchar(255) DEFAULT NULL,
  `meta_og_image_width` varchar(255) DEFAULT NULL,
  `meta_og_image_height` varchar(255) DEFAULT NULL,
  `meta_article_published_time` varchar(255) DEFAULT NULL,
  `meta_article_publisher` varchar(255) DEFAULT NULL,
  `meta_twitter_card` varchar(255) DEFAULT NULL,
  `meta_twitter_domain` varchar(255) DEFAULT NULL,
  `meta_twitter_title` varchar(255) DEFAULT NULL,
  `meta_twitter_description` varchar(255) DEFAULT NULL,
  `meta_twitter_image` varchar(255) DEFAULT NULL,
  `date_indexed` datetime DEFAULT NULL,
  `deleted` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `fk_post_status` (`status`),
  KEY `fk_post_formattype` (`format_type`),
  KEY `fk_post_author` (`author`),
  KEY `fk_post_publisher` (`publisher`),
  CONSTRAINT `fk_post_author` FOREIGN KEY (`author`) REFERENCES `users` (`id`),
  CONSTRAINT `fk_post_formattype` FOREIGN KEY (`format_type`) REFERENCES `format_types` (`id`),
  CONSTRAINT `fk_post_publisher` FOREIGN KEY (`publisher`) REFERENCES `users` (`id`),
  CONSTRAINT `fk_post_status` FOREIGN KEY (`status`) REFERENCES `post_status` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts_categories`
--

DROP TABLE IF EXISTS `posts_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `posts_categories` (
  `post_id` varchar(255) NOT NULL,
  `category_id` varchar(255) NOT NULL,
  PRIMARY KEY (`post_id`,`category_id`),
  KEY `fk_postcategory_category` (`category_id`),
  CONSTRAINT `fk_postcategory_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  CONSTRAINT `fk_postcategory_post` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts_categories`
--

LOCK TABLES `posts_categories` WRITE;
/*!40000 ALTER TABLE `posts_categories` DISABLE KEYS */;
/*!40000 ALTER TABLE `posts_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts_tags`
--

DROP TABLE IF EXISTS `posts_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `posts_tags` (
  `post_id` varchar(255) NOT NULL,
  `tag_id` varchar(255) NOT NULL,
  PRIMARY KEY (`post_id`,`tag_id`),
  KEY `fk_posttag_tag` (`tag_id`),
  CONSTRAINT `fk_posttag_post` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`),
  CONSTRAINT `fk_posttag_tag` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts_tags`
--

LOCK TABLES `posts_tags` WRITE;
/*!40000 ALTER TABLE `posts_tags` DISABLE KEYS */;
/*!40000 ALTER TABLE `posts_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` longtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES ('a','Admin','Admin'),('e','Editor','Editor'),('m','Member','Member'),('s','Subscriber','Subscriber'),('w','Writer','Writer');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tags` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` longtext,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tags`
--

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
INSERT INTO `tags` VALUES ('dabd6d54-4f37-48f7-a6ea-3e0ad344add9','Khoa học tự nhiên','Khoa-hoc-tu-nhien','');
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `pwd` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `role` varchar(255) NOT NULL,
  `is_admin` tinyint(4) NOT NULL DEFAULT '0',
  `date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  KEY `fk_user_role` (`role`),
  CONSTRAINT `fk_user_role` FOREIGN KEY (`role`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('7b9c38d7-bd50-4495-81c8-e24f196377d5','khanhhong5','123456','khanhhong4@mail.com','Hồng','Trần','s',0,'2021-10-05 21:27:32','2021-10-05 21:28:08'),('7c83895a-8901-4615-ac02-6a5b1a960edf','khanhhong6','e10adc3949ba59abbe56e057f20f883e','khanhhong5@mail.com','Hồng','Trần','s',0,'2021-10-05 21:27:32','2021-10-05 21:28:08'),('aba1a6e7-1af6-4618-b5a7-425a6bf38981','khanhhong2','698d51a19d8a121ce581499d7b701668','khanhhong8@mail.com','Khánh Hồng','Trần','s',0,'2021-10-05 21:27:32','2021-10-09 11:48:12');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-10-19 15:45:12
