import Link from 'next/link'
import Image from "next/image";
import Base_menu from "./base_menu";
import {IconBell, IconLogin, IconUserPlus} from '@tabler/icons';
import {useEffect, useState} from "react";
import {IUser} from "../../helpers/interfaces";
import {UserService} from "../../services/user.service";

const Base_header = () => {
    const [user, setUser] = useState<IUser>(null);
    useEffect(() => {
        UserService.userSubject.subscribe(user => setUser(user));
    }, [user]);
    return (
        <header className="navbar navbar-expand-md navbar-light d-print-none sticky-top">
            <div className="container-sm">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-menu">
                    <span className="navbar-toggler-icon"/>
                </button>
                <h1 className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3" style={{paddingTop:"2px",paddingBottom:0}}>
                    <Link href='/'>
                        <a><Image src="/logo.png" width="110" height="40" alt="Tabler" className="navbar-brand-image"/></a>
                    </Link>
                </h1>
                <div className="navbar-nav flex-row order-md-last">
                    <div className="nav-item dropdown d-none d-md-flex me-3">
                        <a href="#" className="nav-link px-0" data-bs-toggle="dropdown" aria-label="Show notifications">
                            <IconBell/><span className="badge bg-red"/>
                        </a>
                        <div className="dropdown-menu dropdown-menu-end dropdown-menu-card">
                            <div className="card">
                                <div className="card-body">
                                    Amet debitis et magni maxime necessitatibus ullam.
                                </div>
                            </div>
                        </div>
                    </div>
                    {UserService.token ?
                        <div className="nav-item dropdown">
                            <a href="#" className="nav-link d-flex lh-1 text-reset p-0" data-bs-toggle="dropdown" aria-label="Open user menu">
                                <span className="avatar avatar-sm" style={{backgroundImage: 'url(/avatars/000m.jpg)'}}/>
                                <div className="d-none d-xl-block ps-2">
                                    <div style={{color: "#02013c"}}>{UserService.user.username}</div>
                                    <div className="mt-1 small text-muted">{UserService.user.lastName} {UserService.user.firstName}</div>
                                </div>
                            </a>
                            <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                <a href="#" className="dropdown-item">Set status</a>
                                <a href="#" className="dropdown-item">Profile & account</a>
                                <a href="#" className="dropdown-item">Feedback</a>
                                <div className="dropdown-divider"/>
                                <Link href={'/admin'}><a className="dropdown-item">Quản trị</a></Link>
                                <a href="#" onClick={UserService.logout} className="dropdown-item">Đăng xuất</a>
                            </div>
                        </div>
                        :
                        <div className="nav-item d-none d-md-flex me-3">
                            <div className="btn-list">
                                <Link href='/login'>
                                    <a className="btn btn-outline-white">
                                        <IconLogin/> Đăng nhập
                                    </a>
                                </Link>
                                <Link href='/register'>
                                    <a className="btn btn-outline-white">
                                        <IconUserPlus/> Đăng ký
                                    </a>
                                </Link>
                            </div>
                        </div>
                    }
                </div>
                <Base_menu/>
            </div>
        </header>
    )
}

export default Base_header
