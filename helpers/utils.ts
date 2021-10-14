import {IUser} from "./interfaces";

export const cookie = {
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

const normalizedUser = (data): IUser =>{
    return {
        email: data.email != undefined ? data.email : "",
        firstName: data.firstName !=undefined ? data.firstName : "",
        id: data.id != undefined ? data.id : "",
        isAdmin: data.isAdmin != undefined ? data.isAdmin : false,
        lastName: data.lastName != undefined ? data.lastName : "",
        pwd: data.pwd != undefined ? data.pwd : "",
        role: data.role != undefined ? data.role : "",
        roleId: data.roleId != undefined ? data.roleId : "",
        username: data.username != undefined ? data.username : ""
    };
}

export const dataNormalization = {
    normalizedUser
}
