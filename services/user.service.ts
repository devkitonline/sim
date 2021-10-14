import Router from 'next/router';
import {fetchWrapper} from 'helpers/fetch-wrapper';
import {BehaviorSubject} from "rxjs";

const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user')));

export const userService = {
    login: (username, password) => {
        return fetchWrapper.post(`/api/login`, {"username": username, "password": password})
        .then(result => {
            console.log(result);
            if (result.code == 1) {
                userSubject.next(result.user);

                return true;
            } else {
                return false;
            }
        });
    },
    logout: () => {
        localStorage.removeItem('sim_token');
        localStorage.removeItem('sim_user');
        userSubject.next(null);
        Router.push('/login');
    },
    user: userSubject.asObservable(),
    get userValue() {
        return userSubject.value
    }
}
