import Link from 'next/link'
import Image from "next/image";
import Base_menu from "./base_menu";

function Base_header() {
    return (
        <header className="navbar navbar-expand-md navbar-light d-print-none sticky-top">
            <div className="container-xl">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-menu">
                    <span className="navbar-toggler-icon"/>
                </button>
                <h1 className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
                    <Link href='/'>
                        <a><Image src="/logo.png" width="110" height="32" alt="Tabler" className="navbar-brand-image" /></a>
                    </Link>
                </h1>
                <div className="navbar-nav flex-row order-md-last">
                    <div className="nav-item d-none d-md-flex me-3">
                        <div className="btn-list">
                            <a href="https://github.com/tabler/tabler" className="btn btn-outline-white" target="_blank" rel="noreferrer">
                                <i className="ti ti-login"/> Đăng nhập
                            </a>
                            <a href="https://github.com/sponsors/codecalm" className="btn btn-outline-white" target="_blank" rel="noreferrer">
                                <i className='ti ti-user-plus'/> Đăng ký
                            </a>
                        </div>
                    </div>
                    <div className="nav-item dropdown">
                        <a href="#" className="nav-link d-flex lh-1 text-reset p-0" data-bs-toggle="dropdown" aria-label="Open user menu">
                            <span className="avatar avatar-sm" style={{backgroundImage: 'url(/avatars/000m.jpg)'}}/>
                            <div className="d-none d-xl-block ps-2">
                                <div>Paweł Kuna</div>
                                <div className="mt-1 small text-muted">UI Designer</div>
                            </div>
                        </a>
                        <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                            <a href="#" className="dropdown-item">Set status</a>
                            <a href="#" className="dropdown-item">Profile & account</a>
                            <a href="#" className="dropdown-item">Feedback</a>
                            <div className="dropdown-divider"/>
                            <a href="#" className="dropdown-item">Settings</a>
                            <a href="#" className="dropdown-item">Logout</a>
                        </div>
                    </div>
                </div>
                <Base_menu/>
            </div>
        </header>
    )
}

export default Base_header
