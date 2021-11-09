import Base_header from "@/components/base/base_header";
import Base_footer from "@/components/base/base_footer";
import AdminMenu from "@/components/base/AdminMenu";
import {IconClock, IconEdit, IconEye, IconTrash, IconUser} from "@tabler/icons";
import Head from "next/head";
import Link from "next/link";
import {useEffect, useState} from "react";
import {UserService} from "../../../services/user.service";
import {FetchApi} from "../../../helpers/fetchApi";

const AdminPages = () => {
    const [listData, setListData] = useState([]);
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        if (!mounted) {
            setMounted(true);
            UserService.userSubject.subscribe(user => {
                if (user) {
                    const postData = {
                        "conditions": [],
                        "logicalOperator": "OR",
                        "limit": 20,
                        "offset": 0
                    }
                    FetchApi.post('/api/page/filter', postData).then(res => {
                        if (res.code == 1) {
                            setListData(res.data);
                            console.log(res.data);
                        }
                    });
                }
            });
        }
    }, [listData]);
    const deleteRecord = (url) => {
        FetchApi.delete(url).then(res => {
            if (res.code == 1) {
                alert('Delete success');
                const postData = {
                    "conditions": [],
                    "logicalOperator": "OR",
                    "limit": 20,
                    "offset": 0
                }
                FetchApi.post('/api/page/filter', postData).then(res => {
                    if (res.code == 1) {
                        setListData(res.data);
                        console.log(res.data);
                    }
                });
            }
        })
    }
    return (
        <div>
            <Head>
                <title>Bài viết</title>
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
                            <div className="card-header text-center" style={{display: "block"}}>
                                <h3 className="card-title" style={{fontSize: '1.5rem'}}>Trang</h3>
                            </div>
                            <div className="list-group list-group-flush">
                                {listData.map(item => {
                                    return (
                                        <div key={item.id} className="list-group-item">
                                            <div className="row align-items-center">
                                                <div className="col-auto">
                                                    {item.image ?
                                                        <span className="avatar" style={{backgroundImage: `url(${item.image})`}}/>
                                                        :
                                                        <span className="avatar" style={{backgroundImage: "url(/images/noimage.png)"}}/>
                                                    }
                                                </div>
                                                <div className="col text-truncate">
                                                    <Link href={"/admin/pages/" + item.id}>
                                                        <a href="" className="text-body d-block" style={{fontSize: '1rem'}}>{item.title}</a>
                                                    </Link>
                                                    <small className="d-block text-muted text-truncate mt-n1">{item.slug}</small>
                                                    <small className="d-block text-muted text-truncate mt-n1">{item.excerpt}</small>
                                                    <small className="d-block text-muted text-truncate mt-n1"><IconUser/> {item.author} - <IconClock/> {item.dateModified} - <IconEye/> {item.views}</small>
                                                </div>
                                                <div className="col-auto">
                                                    <a className="nav-link dropdown-toggle" href="#dropdown-menu-list-action" data-bs-toggle="dropdown" role="button" aria-expanded="false">
                                                        <IconEdit/>
                                                    </a>
                                                    <div className="dropdown-menu dropdown-menu-list-action dropdown-menu-arrow">
                                                        <Link href={"/admin/posts/" + item.id}>
                                                            <a className="dropdown-item" href="#"><IconEdit/> sửa</a>
                                                        </Link>
                                                        <a className="dropdown-item" href="#" onClick={() => deleteRecord('/api/page/' + item.id)}><IconTrash/> xóa</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
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
