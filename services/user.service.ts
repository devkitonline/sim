import Router from 'next/router';
import {FetchApi} from 'helpers/fetchApi';
import {BehaviorSubject} from "rxjs";
import {dataNormalization} from "../helpers/utils";
import {IUser} from "../helpers/interfaces";

export class UserService {
    static user: IUser;
    static token: string;
    static userSubject: BehaviorSubject<IUser> = new BehaviorSubject<IUser>(null);

    static init() {
        const userJson = localStorage.getItem('sim_user');
        const token = localStorage.getItem('sim_token');
        if (userJson && token) {
            const user: IUser = JSON.parse(userJson);
            UserService.token = token;
            UserService.user = user;
            UserService.userSubject.next(user);
        }
    }

    static login(username, password) {
        return FetchApi.post('/api/auth/login', {username: username, password: password})
        .then(res => {
            if (res.code == 1) {
                const user: IUser = dataNormalization.normalizedUser(res.user);
                localStorage.setItem('sim_token', res.token);
                localStorage.setItem('sim_user', JSON.stringify(res.user));
                UserService.token = res.token;
                UserService.user = res.user;
                UserService.userSubject.next(user);
                return true;
            } else {
                return false;
            }
        });
    }

    static logout() {
        localStorage.removeItem('sim_token');
        localStorage.removeItem('sim_user');
        UserService.token = "";
        UserService.user = null;
        this.userSubject.next(null);
        Router.push('/login');
    }
}
