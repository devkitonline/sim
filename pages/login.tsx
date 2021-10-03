import Head from 'next/head'
import Link from 'next/link'
import {cookie} from "@/lib/utils/cookie";
import {useEffect} from "react";
import Image from "next/image";

export default function Login() {
    useEffect(() => {
        cookie.delete('sim_login');
    }, []);
    const doLogin = () => {
        cookie.set('sim_login', 1, 30);
        window.location.href = '/';
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
                                <label className="form-label">Email</label>
                                <input type="email" className="form-control" placeholder="Email"/>
                            </div>
                            <div className="mb-2">
                                <label className="form-label">
                                    Mật khẩu
                                    <span className="form-label-description">
                                        <Link href={'/forgot-password'}>
                                            <a>quên mật khẩu</a>
                                        </Link>
                                    </span>
                                </label>
                                <div className="input-group input-group-flat">
                                    <input type="password" className="form-control" placeholder="Mật khẩu" autoComplete="off"/>
                                </div>
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
