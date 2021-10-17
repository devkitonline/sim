import Head from 'next/head'
import Link from 'next/link'
import Image from "next/image";

function ForgotPassword() {
    return (
        <div>
            <Head>
                <title>Quên mật khẩu</title>
            </Head>
            <div className="page page-center">
                <div className="container-tight py-4">
                    <div className="text-center mb-4">
                        <Link href={'/'}>
                            <a><Image src="/logo.png" height="36" width='100%' alt=""/></a>
                        </Link>
                    </div>
                    <form className="card card-md" action="." method="get">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">Forgot password</h2>
                            <p className="text-muted mb-4">Enter your email address and your password will be reset and emailed to you.</p>
                            <div className="mb-3">
                                <label className="form-label">Email address</label>
                                <input type="email" className="form-control" placeholder="Enter email"/>
                            </div>
                            <div className="form-footer">
                                <a href="#" className="btn btn-primary w-100">
                                    Send me new password
                                </a>
                            </div>
                        </div>
                    </form>
                    <div className="text-center text-muted mt-3">
                        <Link href="/register">Đăng ký</Link>|<Link href="/login">Đăng nhập</Link>
                    </div>
                    <div className="text-center text-muted mt-3">
                        <Link href="/">&gt;&gt;Về trang chủ&lt;&lt;</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword;
