import '../public/styles/globals.css'
import {useEffect} from "react";
import {UserService} from "../services/user.service";

export default function MyApp({Component, pageProps}) {
    useEffect(() => {
        UserService.init();
    }, []);
    return <Component {...pageProps} />
}
