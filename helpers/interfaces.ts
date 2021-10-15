import {EFilterOperator} from "./enums";

export interface IUser {
    id?: string; //If an user hasn't his id, the user is new user.
    username: string;
    pwd: string;
    email:string;
    firstName: string;
    lastName:string;
    role?:string; //role's name
    roleId?:string;
    isAdmin?: boolean;
}

export interface IRole{
    id: string;
    name: string;
    description?:string;
}

export interface ITag {
    id: string;
    name: string;
    slug: string;
    description?: string;
}

export interface ICategory{
    id: string;
    name: string;
    slug: string;
    description?: string;
    image?:string; //link
    categoryParent?: string; //parent's id
}

export interface IPage {
    id: string;
    title: string;
    content: string;
    excerpt: string;
    pageStatus: string;
    pageStatusId?: string;
    dateCreated?: any;
    dateModified?: any;
    datePublishes?: any;
    formatType: string;
    formatTypeId?: string;
    author: string;
    authorId?: string;
    publisher: string;
    publisherId?: string;
    slug: string;
    image?: string;
    tags?: ITag[];
    allowComment: boolean;
    SEOMetaData?: IMetaData;
}

export interface IPost extends IPage{
    categories?: ICategory[];
}

export interface IMetaData {
    metaDescription: string;
    metaRobots: string;
    metaCanonical: string;
    ogLocale: string;
    ogSiteName: string;
    ogType: string;
    ogTitle: string;
    ogDescription: string;
    ogUrl: string;
    ogImage: string;
    ogImageSecureUrl: string;
    ogImageWidth: string;
    ogImageHeight: string;
    articlePublishedTime: string;
    articlePublisher: string;
    twitterCard: string;
    twitterTitle: string;
    twitterDomain: string;
    twitterDescription: string;
    twitterImage: string;
}

export interface IMenu {
    id: string;
    name: string;
    link: string;
    icon?: string;
    orderSort: number;
    parentId?: string;
    children?: IMenu[];
}

/* for query with filter */
export interface IFilterCondition {
    operator: EFilterOperator;
    field: string;
    filterValue?: string | [];
    filterValueTo?: string | [];
    conditions: IFilterCondition[];
    logicalOperator?: string;
}

