import {UserService} from "../services/user.service";

export class FetchApi {
    static get(url) {
        const requestOptions: RequestInit = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                ...FetchApi.addAuthHeader()
            }
        };
        return fetch(url, requestOptions).then(FetchApi.handleResponse);
    }

    static post(url, body) {
        const requestOptions: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                ...FetchApi.addAuthHeader()
            },
            body: JSON.stringify(body)
        };
        return fetch(url, requestOptions).then(FetchApi.handleResponse);
    }

    static postMedia(url, body) {
        const requestOptions: RequestInit = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                ...FetchApi.addAuthHeader()
            },
            body: body
        };
        return fetch(url, requestOptions).then(FetchApi.handleResponse);
    }


    static put(url, body) {
        const requestOptions: RequestInit = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                ...FetchApi.addAuthHeader()
            },
            body: JSON.stringify(body)
        };
        return fetch(url, requestOptions).then(FetchApi.handleResponse);
    }


    static delete(url) {
        const requestOptions: RequestInit = {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                ...FetchApi.addAuthHeader()
            },
        };
        return fetch(url, requestOptions).then(FetchApi.handleResponse);
    }

    static addAuthHeader() {
        if (UserService.token) {
            return {Authorization: `Bearer ${UserService.token}`};
        } else {
            return {};
        }
    }

    static handleResponse(response) {
        return response.json().then(data => {
            if (!response.ok) {
                if ([401, 403].includes(response.status) && (UserService.user || UserService.token)) {
                    UserService.logout();
                }
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
            return data;
        });
    }
};
