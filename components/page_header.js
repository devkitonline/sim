import Link from 'next/link'
import Image from "next/image";

function Page_header() {
    return (
        <header className="navbar navbar-expand-md navbar-light d-print-none">
            <div className="container-xl">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-menu">
                    <span className="navbar-toggler-icon"/>
                </button>
                <h1 className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
                    <a href=".">
                        <Image src="/logo.png" width="110" height="32" alt="Tabler" className="navbar-brand-image">
                    </a>
                </h1>
                <div className="navbar-nav flex-row order-md-last">
                    <div className="nav-item dropdown d-none d-md-flex me-3">
                        <a href="#" className="nav-link px-0" data-bs-toggle="dropdown" tabIndex="-1" aria-label="Show notifications">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6"/>
                                <path d="M9 17v1a3 3 0 0 0 6 0v-1"/>
                            </svg>
                            <span className="badge bg-red"/>
                        </a>
                        <div className="dropdown-menu dropdown-menu-end dropdown-menu-card">
                            <div className="card">
                                <div className="card-body">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus ad amet consectetur exercitationem fugiat in ipsa ipsum, natus odio quidem quod repudiandae sapiente. Amet debitis et magni maxime necessitatibus ullam.
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="nav-item dropdown">
                        <a href="#" className="nav-link d-flex lh-1 text-reset p-0" data-bs-toggle="dropdown" aria-label="Open user menu">
                            <span className="avatar avatar-sm" style={{}}></span>
                            <div className="d-none d-xl-block ps-2">
                                <div>Paweł Kuna</div>
                                <div className="mt-1 small text-muted">UI Designer</div>
                            </div>
                        </a>
                        <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                            <a href="#" className="dropdown-item">Set status</a>
                            <a href="#" className="dropdown-item">Profile & account</a>
                            <a href="#" className="dropdown-item">Feedback</a>
                            <div className="dropdown-divider"></div>
                            <a href="#" className="dropdown-item">Settings</a>
                            <a href="#" className="dropdown-item">Logout</a>
                        </div>
                    </div>
                </div>

            </div>
        </header>
    )
}

export default Page_header
