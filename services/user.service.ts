import getConfig from 'next/config';
import Router from 'next/router';
import { fetchWrapper } from 'helpers/fetch-wrapper';
import {BehaviorSubject} from "rxjs";

const { publicRuntimeConfig } = getConfig();
const baseUrl = `${publicRuntimeConfig.apiUrl}/auth`;
const userSubject = new BehaviorSubject(process.browser && JSON.parse(localStorage.getItem('user')));

const  login = (username, password) => {
    return fetchWrapper.post(`${baseUrl}/login`, { 'username': username, 'password': password })
    .then(result => {
        console.log(result);
        const body:any = JSON.parse(result);
        console.log(body);

        userSubject.next(body.user);

        localStorage.setItem('token', body.user.token);
        localStorage.setItem('user', body.user.id);

        return result;
    });
}

const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    userSubject.next(null);
    Router.push('/login');
}

export  const userService = {
    login,
    logout,
    user: userSubject.asObservable(),
    get userValue () { return userSubject.value }
}
