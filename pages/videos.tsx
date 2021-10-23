import Head from 'next/head'
import Base_header from "../components/base/base_header";
import Base_footer from "../components/base/base_footer";
import CardTopVideo from "@/components/cards/card-with-video/card-top-video";
import CardLargeVideo from "@/components/cards/card-with-video/card-large-video";
import {IconBrandYoutube, IconChevronDown, IconClock, IconPlaylist, IconStar} from "@tabler/icons";
import Link from "next/link";
import Image from "next/image";
import CardLeftVideo from "@/components/cards/card-with-video/card-left-video";

const Videos = () => {
    return (
        <div>
            <Head>
                <title>Videos</title>
            </Head>
            <Base_header/>
            <div className="page-wrapper">
                <div className="page-body">
                    <div className="container-xl">
                        <div className="row align-items-center">
                            <CardLargeVideo
                                title={"Học làm "} link={"https://www.youtube.com/embed/cO3ODTxJ2nc"} views={"1234"} uploadedDate={"111"}
                            />
                            <div className="col-sm-6 col-lg-3">
                                <CardTopVideo
                                    title={"Học làm "} link={"https://www.youtube.com/embed/cO3ODTxJ2nc"} views={"1234"} uploadedDate={"111"}
                                />
                            </div>
                            <div className="col-sm-6 col-lg-3">
                                <CardTopVideo
                                    title={"Học làm "} link={"https://www.youtube.com/embed/cO3ODTxJ2nc"} views={"1234"} uploadedDate={"111"}
                                />
                            </div>
                            <div className="col-sm-6 col-lg-3">
                                <CardTopVideo
                                    title={"Học làm "} link={"https://www.youtube.com/embed/cO3ODTxJ2nc"} views={"1234"} uploadedDate={"111"}
                                />
                            </div>
                            <div className="col-sm-6 col-lg-3">
                                <CardTopVideo
                                    title={"Học làm "} link={"https://www.youtube.com/embed/cO3ODTxJ2nc"} views={"1234"} uploadedDate={"111"}
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="page-wrapper" style={{backgroundColor: '#fff'}}>
                <div className="page-body">
                    <div className="container-xl">
                        <div className='row'>
                            <div className='col-md-3'>
                                <div className="container-fluid">
                                    <h1 className="navbar-brand navbar-brand-autodark" style={{fontSize: "x-large"}}>
                                        <IconPlaylist/> Danh sách phát
                                    </h1>
                                    <div className="list-group list-group-flush overflow-auto" style={{maxHeight: "25rem"}}>
                                        <ul className="navbar-nav pt-lg-3">
                                            <li className="nav-item">
                                                <a className="nav-link" href="#">
                                                    <span className="nav-link-title">
                                                        Home
                                                      </span>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="#">
                                                    <span className="nav-link-title">
                                                        Interface
                                                      </span>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="#">
                                                    <span className="nav-link-title">
                                                        Forms
                                                      </span>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link">
                                                    <span className="nav-link-title">
                                                        Extra
                                                      </span>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="#">
                                                    <span className="nav-link-title">
                                                        Layout
                                                      </span>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="#">
                                                    <span className="nav-link-title">
                                                        Documentation
                                                      </span>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="#">
                                                    <span className="nav-link-title">
                                                        Home
                                                      </span>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="#">
                                                    <span className="nav-link-title">
                                                        Interface
                                                      </span>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="#">
                                                    <span className="nav-link-title">
                                                        Forms
                                                      </span>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link">
                                                    <span className="nav-link-title">
                                                        Extra
                                                      </span>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="#">
                                                    <span className="nav-link-title">
                                                        Layout
                                                      </span>
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="#">
                                                    <span className="nav-link-title">
                                                        Documentation
                                                      </span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-9'>
                                <div className="container-fluid">
                                    <div className='row' style={{paddingTop: "0.5rem", paddingBottom: "0.5rem"}}>
                                        <div className='col-md-6 d-flex flex-row'>
                                            <a href="#" className="btn btn-ghost-dark disabled" style={{fontSize: "larger"}}>
                                                <IconBrandYoutube/> 2222 videos
                                            </a>
                                        </div>
                                        <div className='col-md-6 order-last d-flex flex-row-reverse'>
                                            <a href="#" className="btn btn-outline-white dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-expanded="false">
                                                <IconClock/>
                                                <span>Mới nhất</span>
                                            </a>
                                            <div className="dropdown-menu">
                                                <a className="dropdown-item" href="#">
                                                    <IconClock/>
                                                    <span style={{marginLeft: "0.5rem"}}>Mới nhất</span>
                                                </a>
                                                <a className="dropdown-item" href="#">
                                                    <IconStar/>
                                                    <span style={{marginLeft: "0.5rem"}}>Xem nhiều nhất</span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="list-group list-group-flush overflow-auto" style={{maxHeight: "30rem"}}>
                                        <div className="divide-y">
                                            <div className="row">
                                                <CardLeftVideo
                                                    title={"Học làm "} link={"https://www.youtube.com/embed/cO3ODTxJ2nc"} views={"1234"} uploadedDate={"111"}
                                                />
                                            </div>
                                            <div className="row">
                                                <CardLeftVideo
                                                    title={"Học làm "} link={"https://www.youtube.com/embed/cO3ODTxJ2nc"} views={"1234"} uploadedDate={"111"}
                                                />
                                            </div>
                                            <div className="row">
                                                <CardLeftVideo
                                                    title={"Học làm "} link={"https://www.youtube.com/embed/cO3ODTxJ2nc"} views={"1234"} uploadedDate={"111"}
                                                />
                                            </div>
                                            <div className="row">
                                                <CardLeftVideo
                                                    title={"Học làm "} link={"https://www.youtube.com/embed/cO3ODTxJ2nc"} views={"1234"} uploadedDate={"111"}
                                                />
                                            </div>
                                            <div className="row">
                                                <CardLeftVideo
                                                    title={"Học làm "} link={"https://www.youtube.com/embed/cO3ODTxJ2nc"} views={"1234"} uploadedDate={"111"}
                                                />
                                            </div>
                                            <div className="row">
                                                <CardLeftVideo
                                                    title={"Học làm "} link={"https://www.youtube.com/embed/cO3ODTxJ2nc"} views={"1234"} uploadedDate={"111"}
                                                />
                                            </div>
                                            <div className="row">
                                                <CardLeftVideo
                                                    title={"Học làm "} link={"https://www.youtube.com/embed/cO3ODTxJ2nc"} views={"1234"} uploadedDate={"111"}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Base_footer/>
        </div>
    )
}

export default Videos;
