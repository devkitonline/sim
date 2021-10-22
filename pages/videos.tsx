import Head from 'next/head'
import Base_header from "../components/base/base_header";
import Base_footer from "../components/base/base_footer";
import CardTopVideo from "@/components/cards/card-with-video/card-top-video";
import CardLargeVideo from "@/components/cards/card-with-video/card-large-video";
import {IconPlaylist} from "@tabler/icons";

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
                            <div className='col-md-4'>
                                <div className="container-fluid">
                                    <h1 className="navbar-brand navbar-brand-autodark">
                                        <IconPlaylist/> Danh sách phát
                                    </h1>
                                    <div className="collapse navbar-collapse show">
                                        <ul className="navbar-nav pt-lg-3">
                                            <li className="nav-item">
                                                <a className="nav-link" href="#">
                                                    <span className="nav-link-title">
                                                        Home
                                                      </span>
                                                </a>
                                            </li>
                                            <li className="nav-item dropdown">
                                                <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" role="button" aria-expanded="false">
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
                                            <li className="nav-item dropdown">
                                                <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" role="button" aria-expanded="false">
                                                    <span className="nav-link-title">
                                                        Extra
                                                      </span>
                                                </a>
                                            </li>
                                            <li className="nav-item active dropdown">
                                                <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" role="button" aria-expanded="true">
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
                            <div className='col-md-8'>
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
