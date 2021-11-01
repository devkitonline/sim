import Link from 'next/link';

const AdminMenu = () => {
    return (
        <div className="navbar-expand-md">
            <div className="collapse navbar-collapse" id="navbar-menu-admin">
                <div className="navbar navbar-light">
                    <div className="container-sm">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link href='/admin'>
                                    <a className="nav-link">
                                        <span className="nav-link-title">Dashboard</span>
                                    </a>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href='/admin/posts'>
                                    <a className="nav-link">
                                        <span className="nav-link-title">Bài viết</span>
                                    </a>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href='/admin/pages'>
                                    <a className="nav-link">
                                        <span className="nav-link-title">Trang</span>
                                    </a>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href='/admin/categories'>
                                    <a className="nav-link">
                                        <span className="nav-link-title">Danh mục</span>
                                    </a>
                                </Link>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#navbar-layout" data-bs-toggle="dropdown" role="button" aria-expanded="false">
                                    <span className="nav-link-title">
                      Khác
                    </span>
                                </a>
                                <div className="dropdown-menu">
                                    <div className="dropdown-menu-columns">
                                        <div className="dropdown-menu-column">
                                            <a className="dropdown-item" href="./layout-horizontal.html">
                                                Horizontal
                                            </a>
                                            <a className="dropdown-item" href="./layout-vertical.html">
                                                Vertical
                                            </a>
                                            <a className="dropdown-item" href="./layout-vertical-transparent.html">
                                                Vertical transparent
                                            </a>
                                            <a className="dropdown-item" href="./layout-vertical-right.html">
                                                Right vertical
                                            </a>
                                            <a className="dropdown-item" href="./layout-condensed.html">
                                                Condensed
                                            </a>
                                            <a className="dropdown-item" href="./layout-condensed-dark.html">
                                                Condensed dark
                                            </a>
                                            <a className="dropdown-item" href="./layout-combo.html">
                                                Combined
                                            </a>
                                        </div>
                                        <div className="dropdown-menu-column">
                                            <a className="dropdown-item" href="./layout-navbar-dark.html">
                                                Navbar dark
                                            </a>
                                            <a className="dropdown-item" href="./layout-navbar-sticky.html">
                                                Navbar sticky
                                            </a>
                                            <a className="dropdown-item" href="./layout-navbar-overlap.html">
                                                Navbar overlap
                                            </a>
                                            <a className="dropdown-item" href="./layout-dark.html">
                                                Dark mode
                                            </a>
                                            <a className="dropdown-item" href="./layout-rtl.html">
                                                RTL mode
                                            </a>
                                            <a className="dropdown-item" href="./layout-fluid.html">
                                                Fluid
                                            </a>
                                            <a className="dropdown-item" href="./layout-fluid-vertical.html">
                                                Fluid vertical
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminMenu;
