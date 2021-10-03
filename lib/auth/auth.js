import {cookie} from "../utils/cookie";

export function isLogined() {
    if (cookie.get('sim_login')) return 1;
    else return 0;
}
