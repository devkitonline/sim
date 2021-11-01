import Base_header from "@/components/base/base_header";
import Base_footer from "@/components/base/base_footer";
import AdminMenu from "@/components/base/AdminMenu";
import {IconChevronLeft, IconChevronRight, IconEdit, IconSettings, IconTrash} from "@tabler/icons";
import Head from "next/head";
import Link from "next/link";

const AdminPages = () => {
    return (
        <div>
            <Head>
                <title>Trang bài viết</title>
            </Head>
            <Base_header/>
            <AdminMenu/>
            <div className="page-wrapper">
                <div className="page-body">
                    <div className="container-sm">
                        <div className="row">
                            <div className="col-auto">
                                <Link href="/admin/pages/create">
                                    <button className="btn btn-outline-blue">Tạo mới</button>
                                </Link>
                            </div>
                        </div>
                        <div className="card mt-3">
                            <div className="card-header">
                                <h3 className="card-title">Trang</h3>
                            </div>
                            <div className="list-group list-group-flush">
                                <div className="list-group-item">
                                    <div className="row align-items-center">
                                        <div className="col-auto"><input type="checkbox" className="form-check-input"/></div>
                                        <div className="col-auto">
                                            <a href="#">
                                                <span className="avatar" style={{backgroundImage: "url(/avatars/000m.jpg)"}}/>
                                            </a>
                                        </div>
                                        <div className="col text-truncate">
                                            <a href="#" className="text-body d-block">Christabel Charlwood</a>
                                            <small className="d-block text-muted text-truncate mt-n1">Compressed Sass output support (#29702)</small>
                                            <small className="d-block text-muted text-truncate mt-n1">Compressed Sass output support (#29702)</small>
                                            <small className="d-block text-muted text-truncate mt-n1">Compressed Sass output support (#29702)</small>
                                        </div>
                                        <div className="col-auto">
                                            <a className="nav-link dropdown-toggle" href="#dropdown-menu-list-action" data-bs-toggle="dropdown" role="button" aria-expanded="false">
                                                <IconEdit/>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-list-action dropdown-menu-arrow">
                                                <a className="dropdown-item" href="#">
                                                    <IconEdit/> sửa
                                                </a>
                                                <a className="dropdown-item" href="#">
                                                    <IconTrash/> xóa
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="list-group-item">
                                    <div className="row align-items-center">
                                        <div className="col-auto"><input type="checkbox" className="form-check-input"/></div>
                                        <div className="col-auto">
                                            <a href="#">
                                                <span className="avatar" style={{backgroundImage: "url(/avatars/000m.jpg)"}}/>
                                            </a>
                                        </div>
                                        <div className="col text-truncate">
                                            <a href="#" className="text-body d-block">Christabel Charlwood</a>
                                            <small className="d-block text-muted text-truncate mt-n1">Compressed Sass output support (#29702)</small>
                                        </div>
                                        <div className="col-auto">
                                            <a className="nav-link dropdown-toggle" href="#dropdown-menu-list-action" data-bs-toggle="dropdown" role="button" aria-expanded="false">
                                                <IconEdit/>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-list-action dropdown-menu-arrow">
                                                <a className="dropdown-item" href="#">
                                                    <IconEdit/> sửa
                                                </a>
                                                <a className="dropdown-item" href="#">
                                                    <IconTrash/> xóa
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="list-group-item">
                                    <div className="row align-items-center">
                                        <div className="col-auto"><input type="checkbox" className="form-check-input"/></div>
                                        <div className="col-auto">
                                            <a href="#">
                                                <span className="avatar" style={{backgroundImage: "url(/avatars/000m.jpg)"}}/>
                                            </a>
                                        </div>
                                        <div className="col text-truncate">
                                            <a href="#" className="text-body d-block">Christabel Charlwood</a>
                                            <small className="d-block text-muted text-truncate mt-n1">Compressed Sass output support (#29702)</small>
                                        </div>
                                        <div className="col-auto">
                                            <a className="nav-link dropdown-toggle" href="#dropdown-menu-list-action" data-bs-toggle="dropdown" role="button" aria-expanded="false">
                                                <IconEdit/>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-list-action dropdown-menu-arrow">
                                                <a className="dropdown-item" href="#">
                                                    <IconEdit/> sửa
                                                </a>
                                                <a className="dropdown-item" href="#">
                                                    <IconTrash/> xóa
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                <div className="row">
                                    <div className="col order-first">
                                        <a style={{textDecoration: "none"}} className="dropdown-toggle" href="#dropdown-menu-all-list-action" data-bs-toggle="dropdown" role="button" aria-expanded="false">
                                            <IconSettings/> Hành động
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-list-all-action dropdown-menu-arrow">
                                            <a className="dropdown-item" href="#">
                                                <IconTrash/> xóa
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col order-last">
                                        <ul className="pagination">
                                            <li className="page-item disabled">
                                                <a className="page-link" href="#" aria-disabled="true"><IconChevronLeft/></a>
                                            </li>
                                            <li className="page-item"><a className="page-link" href="#">1</a></li>
                                            <li className="page-item active"><a className="page-link" href="#">2</a></li>
                                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                                            <li className="page-item"><a className="page-link" href="#">4</a></li>
                                            <li className="page-item"><a className="page-link" href="#">5</a></li>
                                            <li className="page-item">
                                                <a className="page-link" href="#"><IconChevronRight/></a>
                                            </li>
                                        </ul>
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

export default AdminPages;
