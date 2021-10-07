import Head from 'next/head'
import Link from 'next/link'
import {cookie} from "@/lib/utils/cookie";
import {useEffect, useState} from "react";
import Image from "next/image";
import {userService} from 'services/user.service';
import Router from "next/router";

function Login() {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    useEffect(() => {
        cookie.delete('sim_login');
    }, []);

    const doLogin = () => {

        userService.login(username, password)
        .then(result => {
            console.log(result);
        });

        Router.push('/');
    };

    return (
        <div>
            <Head>
                <title>Đăng nhập</title>
            </Head>
            <div className="page page-center">
                <div className="container-tight py-4">
                    <div className="text-center mb-4">
                        <Link href={'/'}>
                            <a><Image src="/logo.png" height="36" width='100%' alt=""/></a>
                        </Link>
                    </div>
                    <form className="card card-md" autoComplete="off">
                        <div className="card-body">
                            <div className="mb-3">
                                <label className="form-label">Tên tài khoản</label>
                                <input type="text" className="form-control" placeholder="Tên tài khoản"
                                       value={username}
                                       onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="mb-2">
                                <label className="form-label">
                                    Mật khẩu
                                </label>
                                <div className="input-group input-group-flat">
                                    <input type="password" className="form-control" placeholder="Mật khẩu" autoComplete="off"
                                           value={password} onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <span className="form-label-description mt-1">
                                        <Link href={'/forgot-password'}>
                                            <a>Quên mật khẩu</a>
                                        </Link>
                                    </span>
                            </div>
                            <div className="form-footer">
                                <button onClick={doLogin} type="button" className="btn btn-primary w-100">Đăng nhập</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;
