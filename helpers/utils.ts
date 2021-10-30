import {IFilterCondition, IMenu, IUser} from "./interfaces";
import slugify from "slugify";

export const Cookie = {
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

export const slugHelper = {
    generateSlug: (name): string => {
        return slugify(name);
    }
}

/* DATA NORMALIZATION HELPER FUNCTIONS */
export const dataNormalization = {
    normalizedUser: (data): IUser => {
        return {
            email: data.email != undefined ? data.email : "",
            firstName: data.firstName != undefined ? data.firstName : "",
            id: data.id != undefined ? data.id : "",
            isAdmin: data.isAdmin != undefined ? data.isAdmin : false,
            lastName: data.lastName != undefined ? data.lastName : "",
            pwd: data.pwd != undefined ? data.pwd : "",
            role: data.role != undefined ? data.role : "",
            roleId: data.roleId != undefined ? data.roleId : "",
            username: data.username != undefined ? data.username : ""
        };
    },
    normalizedMenu: (data): IMenu => {
        let menuChildren: IMenu[] = [];

        if (data?.children != undefined && Array.isArray(data.children) && data.children.length > 0) {
            for (let child of data.children) {
                const menuChild: IMenu = dataNormalization.normalizedMenu(child);
                menuChildren.push(menuChild);
            }
        }
        return {
            children: menuChildren,
            icon: data.icon != undefined ? data.icon : "",
            id: data.id != undefined ? data.id : "",
            link: data.link != undefined ? data.link : "",
            name: data.name != undefined ? data.name : "",
            orderSort: data.orderSort != undefined ? data.orderSort : "",
            parentId: data.parentId != undefined ? data.parentId : ""
        }
    },
    normalizedFilterCondition: (data): IFilterCondition => {
        let conditions: IFilterCondition[] = [];
        if (data?.conditions != undefined && Array.isArray(data.conditions) && data.conditions.length > 0) {
            for (let c of data.conditions) {
                const c1 = dataNormalization.normalizedFilterCondition(c);
                conditions.push(c1);
            }
        }
        return {
            conditions: conditions,
            field: data.field != undefined ? data.field : "",
            filterValue: data.filterValue != undefined ? data.filterValue : "",
            filterValueTo: data.filterValueTo != undefined ? data.filterValueTo : "",
            logicalOperator: data.logicalOperator != undefined ? data.logicalOperator : "",
            operator: data.operator != undefined ? data.operator : ""
        }
    }
}
export const ArrayUtils = {
    findById: (key, value, arr) => {
        for (const [k, v] of Object.entries(arr)) {
            if (v.hasOwnProperty(key)) {
                // @ts-ignore
                if (v[key] == value) {
                    return v;
                }
            }
        }
        return false;
    }
}
