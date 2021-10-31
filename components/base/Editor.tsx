import {useEffect, useRef, useState} from "react";
import Image from 'next/image';
import {FetchApi} from "../../helpers/fetchApi";
import {UserService} from "../../services/user.service";
import {ArrayUtils} from "../../helpers/utils";

export function Editor({onChange, editorLoaded, name, value}) {
    const editorRef = useRef();
    // @ts-ignore
    const {CKEditor, ClassicEditor} = editorRef.current || {};
    const [listFiles, setListFiles] = useState([]);
    let listFilesSelected = [];

    const uploadMedia = () => {
        let input = document.querySelector('input[name="file"]')
        let data = new FormData();
        // @ts-ignore
        data.append('file', input.files[0]);
        FetchApi.postMedia('/api/media?make_public=true&name=media', data)
        .then(res => {
            if (res.code == '1') {
                setListFiles([...[{path: res.path, id: res.id}], ...listFiles]);
            }
        });
    }

    const selectMedia = () => {
        listFilesSelected.map(id => {
            let item = ArrayUtils.findById('id', id, listFiles);
            // @ts-ignore
            value = value + `<img src="${item.path}"/>`;
        });
        onChange(value);
        listFilesSelected = [];

        const ms = document.getElementsByClassName('mediaselector');
        for (var i = 0; i < ms.length; i++) {
            // @ts-ignore
            ms[i].checked = false;
        }
    }

    const checkMedia = (e) => {
        if (e.target.checked) {
            listFilesSelected.push(e.target.value);
        } else {
            listFilesSelected.splice(listFilesSelected.indexOf(e.target.value), 1);
        }
    }

    useEffect(() => {
        // @ts-ignore
        editorRef.current = {
            CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
            ClassicEditor: require("@ckeditor/ckeditor5-build-classic")
        };
        UserService.userSubject.subscribe(user => {
            if (user) {
                FetchApi.get('/api/media')
                .then(res => {
                    if (res.code == '1') {
                        let tmps = [];
                        res.files.map(item => {
                            tmps.push({path: item.path, id: item.id});
                        });
                        setListFiles(tmps);
                    }
                });
            }
        });
    }, []);

    return (
        <div>
            <button className="btn btn-outline btn-cyan mb-1" data-bs-toggle="modal" data-bs-target="#modal-add-media">Add Media</button>
            <div className="modal modal-blur fade" id="modal-add-media" role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Media Gallery</h3>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <div className="row g-2">
                                    {listFiles.map(m => {
                                        return (<div key={m.id} className="col-4 col-sm-2">
                                            <label className="form-imagecheck mb-2">
                                                <input type="checkbox" onChange={(e) => checkMedia(e)} value={m.id} className="form-imagecheck-input mediaselector"/>
                                                <span className="form-imagecheck-figure">
                                                    <Image objectFit='cover' width='100' height='100' src={m.path} className="form-imagecheck-image"/>
                                                </span>
                                            </label>
                                        </div>)
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <input type="file" className="form-control" name='file' onChange={uploadMedia}/>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={selectMedia}>Chọn</button>
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
