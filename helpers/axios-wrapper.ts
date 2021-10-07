import axios, {AxiosResponse} from 'axios';
import getConfig from 'next/config';
import {userService} from 'services/user.service';

const {publicRuntimeConfig} = getConfig();

const post = (url, data): Promise<AxiosResponse> => {
    return axios.post(url, JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json',
            ...authHeader(url)
        }
    });
}

// helper functions

const authHeader = (url) => {
    // return auth header with jwt if user is logged in and request is to the api url
    const user = userService.userValue;
    const isLoggedIn = user && user.token;
    const isApiUrl = url.startsWith(publicRuntimeConfig.apiUrl);
    if (isLoggedIn && isApiUrl) {
        return {Authorization: `Bearer ${user.token}`};
    } else {
        return {};
    }
}

export const axiosWrapper = {
    post
}
