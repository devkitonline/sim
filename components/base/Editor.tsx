import React, {useEffect, useRef, useState} from "react";
import Image from 'next/image';
import {FetchApi} from "../../helpers/fetchApi";

export function Editor({onChange, editorLoaded, name, value}) {
    const editorRef = useRef();
    // @ts-ignore
    const {CKEditor, ClassicEditor} = editorRef.current || {};
    const [listFiles, setListFiles] = useState([
        {path: '1'},
        {path: '2'}
    ]);

    const uploadMedia = () => {
        let input = document.querySelector('input[name="file"]')
        let data = new FormData();
        // @ts-ignore
        data.append('file', input.files[0]);
        FetchApi.postMedia('/api/media?make_public=true&name=media', data)
        .then(res => {
            if (res.code == '1') {
                let temp = [];
                temp.push({path: res.path});
                listFiles.map(m => temp.push(m));
                setListFiles(temp);
                console.log(temp);
            }
        })
    }

    useEffect(() => {
        console.log(listFiles);
        // @ts-ignore
        editorRef.current = {
            CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
            ClassicEditor: require("@ckeditor/ckeditor5-build-classic")
        };
    }, []);

    return (
        <div>
            <button className="btn btn-outline btn-cyan mb-1" data-bs-toggle="modal" data-bs-target="#modal-add-media">Add Media</button>
            <div className="modal modal-blur fade" id="modal-add-media" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            {/*<input type='text' className='form-control' placeholder='Tìm kiếm'/>*/}
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <div className="row g-2">
                                    {listFiles.map(m => {
                                        <div className="col-4 col-sm-2">
                                            <label className="form-imagecheck mb-2">
                                                <input name="form-imagecheck" type="checkbox" value="1" className="form-imagecheck-input"/>
                                                <span className="form-imagecheck-figure">
                                                <Image width='100' height='100' src={m.path} className="form-imagecheck-image"/>
                                              </span>
                                            </label>
                                        </div>
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <input type="file" className="form-control" name='file' onChange={uploadMedia}/>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Chọn</button>
                        </div>
                    </div>
                </div>
            </div>
            {editorLoaded ? (
                <CKEditor
                    name={name}
                    editor={ClassicEditor}
                    data={value}
                    onChange={(event, editor) => {
                        onChange(editor.getData());
                    }}
                />
            ) : (
                <div>Loading Editor</div>
            )}
        </div>
    );
}
