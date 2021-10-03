import Link from 'next/link'
import Image from "next/image";
import Page_menu from "./page_menu";

function Page_header() {
    return (
        <header className="navbar navbar-expand-md navbar-light d-print-none sticky-top">
            <div className="container-xl">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-menu">
                    <span className="navbar-toggler-icon"/>
                </button>
                <h1 className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
                    <a href=".">
                        <Image src="/logo.png" width="110" height="32" alt="Tabler" className="navbar-brand-image" />
                    </a>
                </h1>
                <div className="navbar-nav flex-row order-md-last">
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
                <Page_menu/>
            </div>
        </header>
    )
}

export default Page_header
