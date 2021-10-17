import Head from 'next/head'
import Link from 'next/link'
import {useState} from "react";
import Image from "next/image";
import {UserService} from 'services/user.service';
import {useRouter} from "next/router";

function Register() {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [confirm, setConfirm] = useState<boolean>(false);
    const [btnLbl, setBtnLbl] = useState<string>("Đăng ký");
    const [showRegisterError, setShowRegisterError] = useState<boolean>(false);
    const [showRegisterErrorMsg, setShowRegisterErrorMsg] = useState<string>("");
    const router = useRouter();
    const doRegister = () => {
        if(confirm) {
            setShowRegisterError(false);
            setBtnLbl("Đang khởi tạo tài khoản ...");
            UserService.register({
                username: username,
                pwd: password,
                firstName: firstName,
                lastName: lastName,
                email: email
            }).then(res => {
                if (res.code == 1) router.push('/login');
                else {
                    setBtnLbl("Đăng ký");
                    setShowRegisterError(true);
                    setShowRegisterErrorMsg(res.message);
                }
            });
        }else{
            setShowRegisterError(true);
            setShowRegisterErrorMsg("Bạn chưa đồng ý điều khoản dịch vụ");
        }
    }
    const keyEnterHandle = (event) => {
        if (event.key == "Enter") doRegister();
    }
    return (
        <div>
            <Head>
                <title>Đăng ký</title>
            </Head>
            <div className="page page-center">
                <div className="container-tight py-4">
                    <div className="text-center mb-4">
                        <Link href={'/'}>
                            <a><Image src="/logo.png" height="36" width='100%' alt=""/></a>
                        </Link>
                    </div>
                    <form className="card card-md">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">Đăng ký</h2>
                            <div className="mb-3">
                                <label className="form-label">Họ và tên đệm</label>
                                <input type="text" className="form-control" placeholder="Họ và tên đệm"
                                       value={lastName}
                                       onChange={(e) => setLastName(e.target.value)}
                                       onKeyDown={keyEnterHandle}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Tên</label>
                                <input type="text" className="form-control" placeholder="Tên"
                                       value={firstName}
                                       onChange={(e) => setFirstName(e.target.value)}
                                       onKeyDown={keyEnterHandle}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input type="email" className="form-control" placeholder="Email"
                                       value={email}
                                       onChange={(e) => setEmail(e.target.value)}
                                       onKeyDown={keyEnterHandle}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Tên tài khoản</label>
                                <input type="text" className="form-control" placeholder="Tên tài khoản"
                                       value={username}
                                       onChange={(e) => setUsername(e.target.value)}
                                       onKeyDown={keyEnterHandle}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Mật khẩu</label>
                                <div className="input-group input-group-flat">
                                    <input type="password" className="form-control" placeholder="Password" autoComplete="off"
                                           value={password}
                                           onChange={(e) => setPassword(e.target.value)}
                                           onKeyDown={keyEnterHandle}
                                    />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-check">
                                    <input type="checkbox" className="form-check-input" checked={confirm} onChange={() => setConfirm(!confirm)}/>
                                    <span className="form-check-label">Đồng ý với các điều khoản dịch vụ của chúng tôi.</span>
                                </label>
                            </div>
                            <div className="form-footer">
                                <button onClick={doRegister} type="button" className="btn btn-primary w-100">{btnLbl}</button>
                                {showRegisterError ?
                                    <div className="invalid-feedback text-center" style={{display: "block"}}>{showRegisterErrorMsg}</div>
                                    :
                                    ''
                                }
                            </div>
                        </div>
                    </form>
                    <div className="text-center text-muted mt-3">
                        Đã có tài khoản? <Link href="/login">Đăng nhập</Link>
                    </div>
                    <div className="text-center text-muted mt-3">
                        <Link href="/">&gt;&gt;Về trang chủ&lt;&lt;</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;
