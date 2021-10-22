import Link from 'next/link';
const AdminMenu = () => {
    return (
        <div className="navbar-expand-md">
            <div className="collapse navbar-collapse" id="navbar-menu-admin">
                <div className="navbar navbar-light">
                    <div className="container-xl">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link href='/admin'>
                                    <a className="nav-link">
                                        <span className="nav-link-title">Dashboard</span>
                                    </a>
                                </Link>
                            </li>
                            <li className="nav-item active dropdown">
                                <a className="nav-link dropdown-toggle" href="#navbar-base-admin" data-bs-toggle="dropdown" role="button" aria-expanded="false">
                                    <span className="nav-link-title">Bài viết</span>
                                </a>
                                <div className="dropdown-menu">
                                    <Link href='/admin/posts/create'>
                                        <a className="dropdown-item">
                                            Viết bài mới
                                        </a>
                                    </Link>
                                    <a className="dropdown-item" href="./gallery.html">
                                        Gallery
                                    </a>
                                    <a className="dropdown-item" href="./invoice.html">
                                        Invoice
                                    </a>
                                    <a className="dropdown-item" href="./search-results.html">
                                        Search results
                                    </a>
                                    <a className="dropdown-item" href="./pricing.html">
                                        Pricing cards
                                    </a>
                                    <a className="dropdown-item" href="./users.html">
                                        Users
                                    </a>
                                    <a className="dropdown-item" href="./license.html">
                                        License
                                    </a>
                                    <a className="dropdown-item" href="./music.html">
                                        Music
                                    </a>
                                    <a className="dropdown-item" href="./widgets.html">
                                        Widgets
                                    </a>
                                    <a className="dropdown-item" href="./wizard.html">
                                        Wizard
                                    </a>
                                </div>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="./form-elements.html">
                                    <span className="nav-link-title">
                      Form elements
                    </span>
                                </a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#navbar-extra" data-bs-toggle="dropdown" role="button" aria-expanded="false">
                                    <span className="nav-link-title">
                      Extra
                    </span>
                                </a>

                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#navbar-layout" data-bs-toggle="dropdown" role="button" aria-expanded="false">
                                    <span className="nav-link-title">
                      Layout
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
                            <li className="nav-item">
                                <a className="nav-link" href="./docs/index.html">
                                    <span className="nav-link-title">
                      Documentation
                    </span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminMenu;
