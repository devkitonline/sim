import {UserService} from "../services/user.service";

export class FetchApi {
    // static get(url) {
    //     const requestOptions: RequestInit = {
    //         method: 'GET',
    //         headers: authHeader(url)
    //     };
    //     return fetch(url, requestOptions).then(handleResponse);
    // }

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
//
//     static put(url, body) {
//         const requestOptions: RequestInit = {
//             method: 'PUT',
//             headers: {'Content-Type': 'application/json', ...authHeader(url)},
//             body: JSON.stringify(body)
//         };
//         return fetch(url, requestOptions).then(handleResponse);
//     }
//
// // prefixed with underscored because delete is a reserved word in javascript
//     _delete(url) {
//         const requestOptions: RequestInit = {
//             method: 'DELETE',
//             headers: authHeader(url)
//         };
//         return fetch(url, requestOptions).then(handleResponse);
//     }

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
                    // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                    UserService.logout();
                }
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }
            return data;
        });
    }
};
