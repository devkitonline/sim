import Base_header from "@/components/base/base_header";
import Base_footer from "@/components/base/base_footer";
import AdminMenu from "@/components/base/AdminMenu";
import {useState} from "react";
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

const AdminPostCreate = ({postStatusOptions, formatTypeOptions}) => {
    const router = useRouter();
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [status, setStatus] = useState('p');
    const [formatType, setFormatType] = useState('p');
    const [image, setImage] = useState('');
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
            slug: slug,
        };
        FetchApi.post('/api/post', postData).then(res => {
            if (res.code == 1) {
                router.push('/admin/posts');
            } else {
                console.log(res);
                alert('error');
            }
        })
    }
    return (
        <div>
            <Head>
                <title>Viết bài mới</title>
            </Head>
            <Base_header/>
            <AdminMenu/>
            <div className="page-wrapper">
                <div className="page-body">
                    <div className="container-fluid">
                        <h1>Viết bài</h1>
                        <div className='row'>
                            <div className='col-md-8'>
                                <div className="card">
                                    <div className="card-body">
                                        <div className="form-group mb-3">
                                            <label className="form-label required">Tiêu đề</label>
                                            <FieldText setData={setTitle} value={title}/>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label className="form-label required">Mô tả</label>
                                            <FieldTextArea setData={setExcerpt} value={excerpt}/>
                                        </div>
                                        <div className="form-group mb-3 ">
                                            <label className="form-label required">Nội dung</label>
                                            <FieldHtml value={content} setContent={setContent}/>
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
                                            <label className="form-label">Trạng thái</label>
                                            <FieldEnum setData={setStatus} value={status} options={postStatusOptions}/>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label className="form-label">Ảnh đại diện</label>
                                            <FieldImage name='image' setData={setImage} value={image}/>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label className="form-label">Danh mục</label>
                                            <FieldEnum setData={setStatus} value={status} options={postStatusOptions}/>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label className="form-label">Thể loại</label>
                                            <FieldEnum setData={setFormatType} value={formatType} options={formatTypeOptions}/>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label className="form-label">Đường dẫn tĩnh</label>
                                            <FieldSlug setData={setSlug} value={slug} placeholder="--auto-generate--"/>
                                        </div>
                                        <div className="form-group mb-3">
                                            <FieldCheckbox setData={setAllowComment} checked={allowComment} label="Cho phép bình luận"/>
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

AdminPostCreate.getInitialProps = async (ctx) => {
    return {
        postStatusOptions: {
            [EPostStatus.draf]: "Nháp",
            [EPostStatus.hidden]: "Ẩn",
            [EPostStatus.published]: "Công bố",
            [EPostStatus.scheduled]: "Lên lịch",
            [EPostStatus.wait_for_published]: "Đợi công bố"
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
