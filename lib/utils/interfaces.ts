export interface IUser {
    id?: string; //If an user hasn't his id, the user is new user.
    username: string;
    pwd: string;
    email:string;
    firstName: string;
    lastName:string;
    role?:string; //role's name
    isAdmin?: boolean;
}
