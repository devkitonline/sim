import Base_header from "@/components/base/base_header";
import Base_footer from "@/components/base/base_footer";
import AdminMenu from "@/components/base/AdminMenu";
import {useEffect, useState} from "react";
import Head from "next/head";
import FieldHtml from "@/components/fields/FieldHtml";
import {FieldImage} from "@/components/fields/FieldImage";
import {FieldEnum} from "@/components/fields/FieldEnum";
import {FieldText} from "@/components/fields/FieldText";
import {FetchApi} from "../../../helpers/fetchApi";
import {useRouter} from 'next/router'
import {ICategory} from "../../../helpers/interfaces";
import {FieldSlug} from "@/components/fields/FieldSlug";
import {UserService} from "../../../services/user.service";

const AdminCategoriesCreate = () => {
    const router = useRouter();
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [parentId, setParentId] = useState('');
    const [parent, setParent] = useState({});
    const [image, setImage] = useState('');
    const save = () => {
        const postData: ICategory = {
            categoryParent: parentId,
            description: description,
            id: "",
            image: image,
            name: name,
            slug: slug
        };
        FetchApi.post('/api/category', postData).then(res => {
            if (res.code == 1) {
                router.push('/admin/categories');
            } else {
                console.log(res);
                alert('error');
            }
        })
    }
    useEffect(() => {
        UserService.userSubject.subscribe(user => {
            if (user) {
                FetchApi.get('/api/category').then(res => {
                    if (res.code == 1) {
                        let tmp = {};
                        res.categories.map(c => {
                            if (!parentId) setParentId(c.id);
                            tmp[c.id] = c.name
                        });
                        setParent(tmp);
                    }
                });
            }
        })
    }, []);
    return (
        <div>
            <Head>
                <title>Tạo danh mục</title>
            </Head>
            <Base_header/>
            <AdminMenu/>
            <div className="page-wrapper">
                <div className="page-body">
                    <div className="container-fluid">
                        <h1>Tạo danh mục</h1>
                        <div className='row'>
                            <div className='col-md-8'>
                                <div className="card">
                                    <div className="card-body">
                                        <div className="form-group mb-3">
                                            <label className="form-label required">Tên</label>
                                            <FieldText setData={setName} value={name}/>
                                        </div>
                                        <div className="form-group mb-3 ">
                                            <label className="form-label required">Nội dung</label>
                                            <FieldHtml value={description} setContent={setDescription}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-4'>
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="card-title">Cấu hình</h3>
                                    </div>
                                    <div className="card-body">
                                        <div className="form-group mb-3">
                                            <label className="form-label">Ảnh đại diện</label>
                                            <FieldImage name='image' setData={setImage} value={image}/>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label className="form-label">Danh mục cha</label>
                                            <FieldEnum setData={setParentId} value={parentId} options={parent}/>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label className="form-label">Đường dẫn tĩnh</label>
                                            <FieldSlug setData={setSlug} value={slug} placeholder="--auto-generate--"/>
                                        </div>
                                        <div className="text-center">
                                            <button className="btn btn-primary" onClick={save}>Lưu</button>
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

export default AdminCategoriesCreate;
