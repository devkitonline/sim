import Base_header from "@/components/base/base_header";
import Base_footer from "@/components/base/base_footer";
import AdminMenu from "@/components/base/AdminMenu";
import {IconEdit, IconTrash} from "@tabler/icons";
import Head from "next/head";
import Link from "next/link";
import {useEffect, useState} from "react";
import {UserService} from "../../../services/user.service";
import {FetchApi} from "../../../helpers/fetchApi";

const AdminCategories = () => {
    const [listData, setListData] = useState([]);
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        if(!mounted) {
            setMounted(true);
            UserService.userSubject.subscribe(user => {
                if (user) {
                    FetchApi.get('/api/category').then(res => {
                        if (res.code == 1) {
                            setListData(res.categories);
                            console.log(res.categories);
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
                FetchApi.get('/api/category').then(res => {
                    if (res.code == 1) {
                        setListData(res.categories);
                        console.log(res.categories);
                    }
                });
            }
        })
    }
    return (
        <>
            <Head>
                <title>Danh mục</title>
            </Head>
            <Base_header/>
            <AdminMenu/>
            <div className="page-wrapper">
                <div className="page-body">
                    <div className="container-sm">
                        <div className="row">
                            <div className="col-auto">
                                <Link href="/admin/categories/create">
                                    <button className="btn btn-outline-blue">Tạo mới</button>
                                </Link>
                            </div>
                        </div>
                        <div className="card mt-3">
                            <div className="card-header text-center" style={{display:"block"}}>
                                <h3 className="card-title" style={{fontSize:'1.5rem'}}>Danh mục</h3>
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
                                                    <Link href={"/admin/categories/" + item.id}>
                                                        <a href="" className="text-body d-block">{item.name}</a>
                                                    </Link>
                                                    <small className="d-block text-muted text-truncate mt-n1">{item.slug}</small>
                                                </div>
                                                <div className="col-auto">
                                                    <a className="nav-link dropdown-toggle" href="#dropdown-menu-list-action" data-bs-toggle="dropdown" role="button" aria-expanded="false">
                                                        <IconEdit/>
                                                    </a>
                                                    <div className="dropdown-menu dropdown-menu-list-action dropdown-menu-arrow">
                                                        <Link href={"/admin/categories/" + item.id}>
                                                            <a className="dropdown-item" href="#"><IconEdit/> sửa</a>
                                                        </Link>
                                                        <a className="dropdown-item" href="#" onClick={() => deleteRecord('/api/category/' + item.id)}><IconTrash/> xóa</a>
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
        </>
    )
}

export default AdminCategories;
