import Base_header from "@/components/base/base_header";
import Base_footer from "@/components/base/base_footer";
import AdminMenu from "@/components/base/AdminMenu";
import {useEffect, useState} from "react";
import Image from "next/image";
import Head from "next/head";
import FieldHtml from "@/components/fields/FieldHtml";
import {FieldImage} from "@/components/fields/FieldImage";
import {EFormatType, EPostStatus} from "../../../helpers/enums";
import {FieldEnum} from "@/components/fields/FieldEnum";
import {FieldText} from "@/components/fields/FieldText";
import {FieldTextArea} from "@/components/fields/FieldTextArea";
import {FieldCheckbox} from "@/components/fields/FieldCheckbox";
import {FetchApi} from "../../../helpers/fetchApi";
import {UserService} from "../../../services/user.service";
import {useRouter} from 'next/router'
import {IPost} from "../../../helpers/interfaces";
import {FieldSlug} from "@/components/fields/FieldSlug";
import {FieldMultiEnum} from "@/components/fields/FieldMultiEnum";

const AdminPostCreate = ({postStatusOptions, formatTypeOptions}) => {
    const router = useRouter();
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [status, setStatus] = useState('p');
    const [formatType, setFormatType] = useState('p');
    const [image, setImage] = useState('');
    const [categories, setCategories] = useState([]);
    const [categoriesOptions, setCategoriesOptions] = useState([]);
    const [allowComment, setAllowComment] = useState(false);
    const save = () => {
        const postData: IPost = {
            id: "",
            allowComment: allowComment,
            authorId: UserService.user.id,
            content: content,
            excerpt: excerpt,
            formatTypeId: formatType,
            pageStatusId: status,
            image: image,
            title: title,
            slug: slug
        };
        let tmp = [];
        categories.map(item => tmp.push(item.value));
        postData.categories = tmp;
        FetchApi.post('/api/post', postData).then(res => {
            if (res.code == 1) {
                router.push('/admin/posts');
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
                    console.log(res);
                    if (res.code == 1) {
                        let tmp = [];
                        res.categories.map(c => {
                            const o = {
                                label: c.name,
                                value: c.id
                            }
                            tmp.push(o);
                        });
                        console.log(tmp);
                        setCategoriesOptions(tmp);
                    }
                });
            }
        })
    }, []);
    return (
        <div>
            <Head>
                <title>Vi???t b??i m???i</title>
            </Head>
            <Base_header/>
            <AdminMenu/>
            <div className="page-wrapper">
                <div className="page-body">
                    <div className="container-fluid">
                        <h1>Vi???t b??i</h1>
                        <div className='row'>
                            <div className='col-md-8'>
                                <div className="card">
                                    <div className="card-body">
                                        <div className="form-group mb-3">
                                            <label className="form-label required">Ti??u ?????</label>
                                            <FieldText setData={setTitle} value={title}/>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label className="form-label required">M?? t???</label>
                                            <FieldTextArea options={{maxLength: 255}} setData={setExcerpt} value={excerpt}/>
                                        </div>
                                        <div className="form-group mb-3 ">
                                            <label className="form-label required">N???i dung</label>
                                            <FieldHtml value={content} setContent={setContent}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-4'>
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="card-title">C???u h??nh</h3>
                                    </div>
                                    <div className="card-body">
                                        <div className="form-group mb-3">
                                            <label className="form-label">Tr???ng th??i</label>
                                            <FieldEnum setData={setStatus} value={status} options={postStatusOptions}/>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label className="form-label">???nh ?????i di???n</label>
                                            <FieldImage name='image' setData={setImage} value={image}/>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label className="form-label">Danh m???c</label>
                                            <FieldMultiEnum setData={setCategories} value={categories} options={categoriesOptions}/>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label className="form-label">Th??? lo???i</label>
                                            <FieldEnum setData={setFormatType} value={formatType} options={formatTypeOptions}/>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label className="form-label">???????ng d???n t??nh</label>
                                            <FieldSlug setData={setSlug} value={slug} placeholder="--auto-generate--"/>
                                        </div>
                                        <div className="form-group mb-3">
                                            <FieldCheckbox setData={setAllowComment} checked={allowComment} label="Cho ph??p b??nh lu???n"/>
                                        </div>
                                        <div className="text-center">
                                            <button className="btn btn-primary" onClick={save}>L??u</button>
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

AdminPostCreate.getInitialProps = async (ctx) => {
    return {
        postStatusOptions: {
            [EPostStatus.draf]: "Nh??p",
            [EPostStatus.hidden]: "???n",
            [EPostStatus.published]: "C??ng b???",
            [EPostStatus.scheduled]: "L??n l???ch",
            [EPostStatus.wait_for_published]: "?????i c??ng b???"
        },
        formatTypeOptions: {
            [EFormatType.audio]: "Audio",
            [EFormatType.gallery]: "Gallery",
            [EFormatType.image]: "Image",
            [EFormatType.post]: "Post",
            [EFormatType.video]: "Video"

        }
    }
}

export default AdminPostCreate;
