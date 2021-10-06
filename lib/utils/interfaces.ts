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
