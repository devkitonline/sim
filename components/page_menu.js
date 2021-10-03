import Link from 'next/link'
import Image from "next/image";

export default function Page_menu() {
    return (
        <div className="collapse navbar-collapse" id="navbar-menu">
            <div className="d-flex flex-column flex-md-row flex-fill align-items-stretch align-items-md-center">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="./index.html">
                    <span className="nav-link-icon d-md-none d-lg-inline-block">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><polyline points="5 12 3 12 12 3 21 12 19 12"/><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"/><path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"/></svg>
                    </span>
                            <span className="nav-link-title">
                      Home
                    </span>
                        </a>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#navbar-base" data-bs-toggle="dropdown" role="button" aria-expanded="false">
                    <span className="nav-link-icon d-md-none d-lg-inline-block">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><polyline points="12 3 20 7.5 20 16.5 12 21 4 16.5 4 7.5 12 3"/><line x1="12" y1="12" x2="20" y2="7.5"/><line x1="12" y1="12" x2="12" y2="21"/><line x1="12" y1="12" x2="4" y2="7.5"/><line x1="16" y1="5.25" x2="8" y2="9.75"/></svg>
                    </span>
                            <span className="nav-link-title">
                      Interface
                    </span>
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
                    <span className="nav-link-icon d-md-none d-lg-inline-block"><!-- Download SVG icon from http://tabler-icons.io/i/checkbox -->
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><polyline points="9 11 12 14 20 6"/><path d="M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9"/></svg>
                    </span>
                            <span className="nav-link-title">
                      Forms
                    </span>
                        </a>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#navbar-extra" data-bs-toggle="dropdown" role="button" aria-expanded="false">
                    <span className="nav-link-icon d-md-none d-lg-inline-block"><!-- Download SVG icon from http://tabler-icons.io/i/star -->
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"/></svg>
                    </span>
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
                    <span className="nav-link-icon d-md-none d-lg-inline-block"><!-- Download SVG icon from http://tabler-icons.io/i/layout-2 -->
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><rect x="4" y="4" width="6" height="5" rx="2"/><rect x="4" y="13" width="6" height="7" rx="2"/><rect x="14" y="4" width="6" height="7" rx="2"/><rect x="14" y="15" width="6" height="5" rx="2"/></svg>
                    </span>
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
                    <span className="nav-link-icon d-md-none d-lg-inline-block"><!-- Download SVG icon from http://tabler-icons.io/i/file-text -->
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 3v4a1 1 0 0 0 1 1h4"/><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"/><line x1="9" y1="9" x2="10" y2="9"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="15" y2="17"/></svg>
                    </span>
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
