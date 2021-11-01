import Base_header from "@/components/base/base_header";
import Base_footer from "@/components/base/base_footer";
import AdminMenu from "@/components/base/AdminMenu";
import {Editor} from "@/components/base/Editor";
import {useEffect, useState} from "react";
import Image from "next/image";
import {UploadImage} from "@/components/base/UploadImage";

const AdminPostCreate = ({postStatusOptions, formatTypeOptions}) => {
    const [editorLoaded, setEditorLoaded] = useState(false);
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [status, setStatus] = useState('p');
    const [formatType, setFormatType] = useState('p');
    const [image, setImage] = useState('/images/noimage.png');
    const [allowComment, setAllowComment] = useState(false);

    const save = () => {

    }
    useEffect(() => {
        setEditorLoaded(true);
    }, []);
    return (
        <div>
            <Base_header/>
            <AdminMenu/>
            <div className="page-wrapper">
                <div className="page-body">
                    <div className="container-sm">
                        <div className='row'>
                            <div className='col-md-8'>
                                <div className="card">
                                    <div className="card-body">
                                        <div className="form-group mb-3">
                                            <label className="form-label required">Tiêu đề</label>
                                            <input onChange={(e) => setTitle(e.target.value)} type="text" className="form-control"/>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label className="form-label required">Mô tả</label>
                                            <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} className="form-control" maxLength={255}/>
                                        </div>
                                        <div className="form-group mb-3 ">
                                            <Editor
                                                name="content"
                                                onChange={(data) => {
                                                    setContent(data);
                                                }}
                                                editorLoaded={editorLoaded}
                                                value={content}/>
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
                                            <select defaultValue={status} onChange={(e) => setStatus(e.target.value)} className='form-control'>
                                                {Object.keys(postStatusOptions).map(key => {
                                                    return (<option key={key} value={key}>{postStatusOptions[key]}</option>)
                                                })}
                                            </select>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label className="form-label">Ảnh đại diện</label>
                                            <div className="text-center">
                                                <UploadImage name="image" callback={(files) => {
                                                    if (files.length > 0) setImage(files[0]);
                                                }}/>
                                                <Image objectFit="contain" width="200" height="200" src={image}/>
                                            </div>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label className="form-label">Danh mục</label>
                                            <select defaultValue={status} onChange={(e) => setStatus(e.target.value)} className='form-control'>
                                                {Object.keys(postStatusOptions).map(key => {
                                                    return (<option key={key} value={key}>{postStatusOptions[key]}</option>)
                                                })}
                                            </select>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label className="form-label">Thể loại</label>
                                            <select defaultValue={formatType} onChange={(e) => setFormatType(e.target.value)} className='form-control'>
                                                {Object.keys(formatTypeOptions).map(key => {
                                                    return (<option key={key} value={key}>{formatTypeOptions[key]}</option>)
                                                })}
                                            </select>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label className="form-check form-switch">
                                                <input className="form-check-input" type="checkbox"
                                                       defaultChecked={allowComment}
                                                       onChange={(e) => setAllowComment(e.target.checked)}
                                                />
                                                <span className="form-check-label">Cho phép bình luận</span>
                                            </label>
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
    const postStatus = {
        d: "Nháp",
        h: "Ẩn",
        p: "Công bố",
        s: "Lên lịch",
        w: "Đợi công bố"
    }
    const formatType = {
        a: "Audio",
        g: "Gallery",
        i: "Image",
        p: "Post",
        v: "Video"

    }
    return {
        postStatusOptions: postStatus,
        formatTypeOptions: formatType
    }
}

export default AdminPostCreate;
