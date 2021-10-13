import getConfig from 'next/config';
import Router from 'next/router';
import {fetchWrapper} from 'helpers/fetch-wrapper';
import {BehaviorSubject} from "rxjs";
// import {axiosWrapper} from "../helpers/axios-wrapper";

const {publicRuntimeConfig} = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/auth`;
const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user')));

const login = (username, password) => {
    return fetchWrapper.post(`${baseUrl}/login`, {"username": username, "password": password})
    .then(result => {
        if (result.code == 1) {
            userSubject.next(result.user);
            localStorage.setItem('token', result.user.token);
            localStorage.setItem('user', result.user.id);
            localStorage.setItem('user', JSON.stringify(result.user));
            return true;
        } else {
            return false;
        }
    });
}

const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    userSubject.next(null);
    Router.push('/login');
}

export const userService = {
    login,
    logout,
    user: userSubject.asObservable(),
    get userValue() {
        return userSubject.value
    }
}
