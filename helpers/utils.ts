import {IFilterCondition, IMenu, IPost, IUser, ISEOMetaData, ITag, ICategory, IPage} from "./interfaces";
import slugify from "slugify";

export const Cookie = {
    set: (name, value, days) => {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    },
    get: (name) => {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    },
    delete: (name) => {
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
}

/* DATA NORMALIZATION HELPER FUNCTIONS */
export const dataNormalization = {
    normalizedUser: (data): IUser => {
        return {
            email: data.email != undefined ? data.email : "",
            firstName: data.firstName != undefined ? data.firstName : "",
            id: data.id != undefined ? data.id : "",
            isAdmin: data.isAdmin != undefined ? data.isAdmin : false,
            lastName: data.lastName != undefined ? data.lastName : "",
            pwd: data.pwd != undefined ? data.pwd : "",
            role: data.role != undefined ? data.role : "",
            roleId: data.roleId != undefined ? data.roleId : "",
            username: data.username != undefined ? data.username : ""
        };
    },
    normalizedMenu: (data): IMenu => {
        let menuChildren: IMenu[] = [];

        if (data?.children != undefined && Array.isArray(data.children) && data.children.length > 0) {
            for (let child of data.children) {
                const menuChild: IMenu = dataNormalization.normalizedMenu(child);
                menuChildren.push(menuChild);
            }
        }
        return {
            children: menuChildren,
            icon: data.icon != undefined ? data.icon : "",
            id: data.id != undefined ? data.id : "",
            link: data.link != undefined ? data.link : "",
            name: data.name != undefined ? data.name : "",
            orderSort: data.orderSort != undefined ? data.orderSort : "",
            parentId: data.parentId != undefined ? data.parentId : ""
        }
    },
    normalizedFilterCondition: (data): IFilterCondition => {
        let conditions: IFilterCondition[] = [];
        if (data?.conditions != undefined && Array.isArray(data.conditions) && data.conditions.length > 0) {
            for (let c of data.conditions) {
                const c1 = dataNormalization.normalizedFilterCondition(c);
                conditions.push(c1);
            }
        }
        return {
            conditions: conditions,
            field: data.field != undefined ? data.field : "",
            filterValue: data.filterValue != undefined ? data.filterValue : "",
            filterValueTo: data.filterValueTo != undefined ? data.filterValueTo : "",
            logicalOperator: data.logicalOperator != undefined ? data.logicalOperator : "",
            operator: data.operator != undefined ? data.operator : "",
            limit: data.limit != undefined ? data.limit : 20,
            offset: data.offset != undefined ? data.offset : 0
        }
    },
    normalizedTag: (data): ITag =>{
        return{
            description: data.description != undefined ?data.description : "",
            id: data.id != undefined ?data.id : "",
            name: data.name != undefined ?data.name : "",
            slug: data.slug != undefined ?data.slug : ""
        }
    },
    normalizeedCategory: (data) : ICategory =>{
        return{
            categoryParent:data.categoryParent != undefined ?data.categoryParent : "" ,
            description: data.description != undefined ?data.description : "",
            id: data.id != undefined ?data.id : "",
            image: data.image != undefined ?data.image : "",
            name: data.name != undefined ?data.name : "",
            slug: data.slug != undefined ?data.slug : ""
        }
    },
    normalizedPost: (data): IPost => {

        const metaData = dataNormalization.normalizedSEOMetaData(data.SEOMetaData);

        let tags = [];
        if (data.tags != undefined && Array.isArray(data.tags) && (typeof data.tags[0] == 'object')){
            for(let i =0; i< data.tags.length; i++){
                tags.push(dataNormalization.normalizedTag(data.tags[i]));
            }
        }else if (data.tags != undefined && Array.isArray(data.tags) && (typeof data.tags[0] == 'string')){
            for(let j=0;j<data.tags.length; j++){
                tags.push(data.tags[j]);
            }
        }

        let categories = [];
        if (data.categories != undefined && Array.isArray(data.categories) && (typeof data.categories[0] == 'object')){
            for(let i =0; i< data.categories.length; i++){
                categories.push(dataNormalization.normalizeedCategory(data.categories[i]));
            }
        }else if (data.categories != undefined && Array.isArray(data.categories) && (typeof data.categories[0] == 'string')){
            for(let j=0;j<data.categories.length; j++){
                categories.push(data.categories[j]);
            }
        }

        return {
            SEOMetaData: metaData,
            allowComment: data.allowComment != undefined ?data.allowComment :false ,
            author: data.author != undefined ? data.author : "",
            authorId:  data.authorId != undefined ? data.authorId : null,
            categories: categories,
            content: data.content != undefined ? data.content : "",
            dateCreated: data.dateCreated != undefined ? data.dateCreated : "",
            dateModified: data.dateModified != undefined ? data.dateModified : "",
            datePublishes: data.datePublishes != undefined ? data.datePublishes : "" ,
            excerpt:data.excerpt != undefined ? data.excerpt : "" ,
            formatType: data.formatType != undefined ? data.formatType : "",
            formatTypeId: data.formatTypeId != undefined ? data.formatTypeId : "",
            id: data.id != undefined ? data.id : "",
            image: data.image != undefined ? data.image : "",
            pageStatus: data.pageStatus != undefined ? data.pageStatus : "",
            pageStatusId:data.pageStatusId != undefined ? data.pageStatusId : "" ,
            publisher: data.publisher != undefined ? data.publisher : "",
            publisherId:data.publisherId != undefined ? data.publisherId : null ,
            slug: data.slug != undefined ? data.slug : convertToSlug(data.title),
            tags: tags,
            title: data.title != undefined ? data.title : "",
            views: data.views != undefined ? data.views : 0
        }
    },
    normalizedPage: (data): IPage => {

        const metaData = dataNormalization.normalizedSEOMetaData(data.SEOMetaData);

        let tags = [];
        if (data.tags != undefined && Array.isArray(data.tags) && (typeof data.tags[0] == 'object')){
            for(let i =0; i< data.tags.length; i++){
                tags.push(dataNormalization.normalizedTag(data.tags[i]));
            }
        }else if (data.tags != undefined && Array.isArray(data.tags) && (typeof data.tags[0] == 'string')){
            for(let j=0;j<data.tags.length; j++){
                tags.push(data.tags[j]);
            }
        }

        return {
            SEOMetaData: metaData,
            allowComment: data.allowComment != undefined ?data.allowComment :false ,
            author: data.author != undefined ? data.author : "",
            authorId:  data.authorId != undefined ? data.authorId : null,
            content: data.content != undefined ? data.content : "",
            dateCreated: data.dateCreated != undefined ? data.dateCreated : "",
            dateModified: data.dateModified != undefined ? data.dateModified : "",
            datePublishes: data.datePublishes != undefined ? data.datePublishes : "" ,
            excerpt:data.excerpt != undefined ? data.excerpt : "" ,
            formatType: data.formatType != undefined ? data.formatType : "",
            formatTypeId: data.formatTypeId != undefined ? data.formatTypeId : "",
            id: data.id != undefined ? data.id : "",
            image: data.image != undefined ? data.image : "",
            pageStatus: data.pageStatus != undefined ? data.pageStatus : "",
            pageStatusId:data.pageStatusId != undefined ? data.pageStatusId : "" ,
            publisher: data.publisher != undefined ? data.publisher : "",
            publisherId:data.publisherId != undefined ? data.publisherId : null ,
            slug: data.slug != undefined ? data.slug : convertToSlug(data.title),
            tags: tags,
            title: data.title != undefined ? data.title : "",
            views: data.views != undefined ? data.views : 0
        }
    },
    normalizedSEOMetaData: (data) : ISEOMetaData =>{
        return {
            articlePublishedTime: data?.articlePublishedTime!=undefined ? data.articlePublishedTime : "",
            articlePublisher: data?.articlePublisher!=undefined ? data.articlePublisher : "",
            metaCanonical: data?.metaCanonical!=undefined ? data.metaCanonical : "",
            metaDescription: data?.metaDescription!=undefined ? data.metaDescription : "",
            metaRobots: data?.metaRobots!=undefined ? data.metaRobots : "",
            ogDescription:data?.ogDescription!=undefined ? data.ogDescription : "",
            ogImage:data?.ogImage!=undefined ? data.ogImage : "",
            ogImageHeight: data?.ogImageHeight!=undefined ? data.ogImageHeight : "",
            ogImageSecureUrl: data?.ogImageSecureUrl!=undefined ? data.ogImageSecureUrl : "",
            ogImageWidth: data?.ogImageWidth!=undefined ? data.ogImageWidth : "",
            ogLocale: data?.ogLocale!=undefined ? data.ogLocale : "",
            ogSiteName: data?.ogSiteName!=undefined ? data.ogSiteName : "",
            ogTitle: data?.ogTitle!=undefined ? data.ogTitle : "",
            ogType: data?.ogType!=undefined ? data.ogType : "",
            ogUrl: data?.ogUrl!=undefined ? data.ogUrl : "",
            twitterCard: data?.twitterCard!=undefined ? data.twitterCard : "",
            twitterDescription: data?.twitterDescription!=undefined ? data.twitterDescription : "",
            twitterDomain: data?.twitterDomain!=undefined ? data.twitterDomain : "",
            twitterImage: data?.twitterImage!=undefined ? data.twitterImage : "",
            twitterTitle: data?.twitterTitle!=undefined ? data.twitterTitle : ""
        }
    }
}
export const ArrayUtils = {
    findById: (key, value, arr) => {
        for (const [k, v] of Object.entries(arr)) {
            if (v.hasOwnProperty(key)) {
                // @ts-ignore
                if (v[key] == value) {
                    return v;
                }
            }
        }
        return false;
    }
}

export const convertToSlug = (str: string): string => {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from = "ăâấầẩẫậắằẳẵặãàáäâêếềểễệưứừửữựơớờởỡợôốồổỗộẽèéëêìíïîỏọõòóöôùúüûñç·/_,:;";
    var to =     "aaaaaaaaaaaaaaaaaeeeeeeuuuuuuooooooooooooeeeeeiiiiooooooouuuunc------";
    for (var i = 0, l = from.length; i < l; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

    return str;
};
