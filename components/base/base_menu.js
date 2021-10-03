import Link from 'next/link'

export default function Base_menu() {
    return (
        <div className="collapse navbar-collapse" id="navbar-menu">
            <div className="d-flex flex-column flex-md-row flex-fill align-items-stretch align-items-md-center">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link href='/'>
                            <a className='nav-link'>
                                <span className="nav-link-title">Home</span>
                            </a>
                        </Link>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#navbar-base" data-bs-toggle="dropdown" role="button" aria-expanded="false">
                            <span className="nav-link-title">Interface</span>
                        </a>
                        <div className="dropdown-menu">
                            <div className="dropdown-menu-columns">
                                <div className="dropdown-menu-column">
                                    <a className="dropdown-item" href="./empty.html">
                                        Empty page
                                    </a>
                                    <a className="dropdown-item" href="./accordion.html">
                                        Accordion
                                    </a>
                                    <a className="dropdown-item" href="./blank.html">
                                        Blank page
                                    </a>
                                    <a className="dropdown-item" href="./buttons.html">
                                        Buttons
                                    </a>
                                    <a className="dropdown-item" href="./cards.html">
                                        Cards
                                    </a>
                                    <a className="dropdown-item" href="./cards-masonry.html">
                                        Cards Masonry
                                    </a>
                                    <a className="dropdown-item" href="./colors.html">
                                        Colors
                                    </a>
                                    <a className="dropdown-item" href="./dropdowns.html">
                                        Dropdowns
                                    </a>
                                    <a className="dropdown-item" href="./icons.html">
                                        Icons
                                    </a>
                                    <a className="dropdown-item" href="./modals.html">
                                        Modals
                                    </a>
                                    <a className="dropdown-item" href="./maps.html">
                                        Maps
                                    </a>
                                    <a className="dropdown-item" href="./map-fullsize.html">
                                        Map fullsize
                                    </a>
                                    <a className="dropdown-item" href="./maps-vector.html">
                                        Vector maps
                                    </a>
                                </div>
                                <div className="dropdown-menu-column">
                                    <a className="dropdown-item" href="./navigation.html">
                                        Navigation
                                    </a>
                                    <a className="dropdown-item" href="./charts.html">
                                        Charts
                                    </a>
                                    <a className="dropdown-item" href="./pagination.html">
                                        Pagination
                                    </a>
                                    <a className="dropdown-item" href="./skeleton.html">
                                        Skeleton
                                    </a>
                                    <a className="dropdown-item" href="./tabs.html">
                                        Tabs
                                    </a>
                                    <a className="dropdown-item" href="./tables.html">
                                        Tables
                                    </a>
                                    <a className="dropdown-item" href="./carousel.html">
                                        Carousel
                                    </a>
                                    <a className="dropdown-item" href="./lists.html">
                                        Lists
                                    </a>
                                    <a className="dropdown-item" href="./typography.html">
                                        Typography
                                    </a>
                                    <a className="dropdown-item" href="./markdown.html">
                                        Markdown
                                    </a>
                                    <div className="dropend">
                                        <a className="dropdown-item dropdown-toggle" href="#sidebar-authentication" data-bs-toggle="dropdown" role="button" aria-expanded="false">
                                            Authentication
                                        </a>
                                        <div className="dropdown-menu">
                                            <a href="./sign-in.html" className="dropdown-item">Sign in</a>
                                            <a href="./sign-up.html" className="dropdown-item">Sign up</a>
                                            <a href="./forgot-password.html" className="dropdown-item">Forgot password</a>
                                            <a href="./terms-of-service.html" className="dropdown-item">Terms of service</a>
                                            <a href="./auth-lock.html" className="dropdown-item">Lock screen</a>
                                        </div>
                                    </div>
                                    <div className="dropend">
                                        <a className="dropdown-item dropdown-toggle" href="#sidebar-error" data-bs-toggle="dropdown" role="button" aria-expanded="false">
                                            Error pages
                                        </a>
                                        <div className="dropdown-menu">
                                            <a href="./error-404.html" className="dropdown-item">404 page</a>
                                            <a href="./error-500.html" className="dropdown-item">500 page</a>
                                            <a href="./error-maintenance.html" className="dropdown-item">Maintenance page</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="./form-elements.html">
                            <span className="nav-link-title">
                      Forms
                    </span>
                        </a>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#navbar-extra" data-bs-toggle="dropdown" role="button" aria-expanded="false">
                            <span className="nav-link-title">
                      Extra
                    </span>
                        </a>
                        <div className="dropdown-menu">
                            <a className="dropdown-item" href="./activity.html">
                                Activity
                            </a>
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
                    <li className="nav-item active dropdown">
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
                                    <a className="dropdown-item active" href="./layout-condensed.html">
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
    )
}
