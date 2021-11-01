import {useEffect, useState} from "react";
import Image from 'next/image';
import {FetchApi} from "../../helpers/fetchApi";
import {UserService} from "../../services/user.service";
import {ArrayUtils} from "../../helpers/utils";

export function UploadImage({name, callback}) {
    const [listFiles, setListFiles] = useState([]);
    let listFilesSelected = [];

    const uploadMedia = () => {
        let input = document.querySelector(`input[name="${name}"]`);
        let data = new FormData();
        // @ts-ignore
        data.append('file', input.files[0]);
        FetchApi.postMedia('/api/media?make_public=true&name=' + name, data)
        .then(res => {
            if (res.code == '1') {
                setListFiles([...[{path: res.path, id: res.id}], ...listFiles]);
            }
        });
    }

    const checkMedia = (e) => {
        if (e.target.checked) {
            listFilesSelected.push(e.target.value);
        } else {
            listFilesSelected.splice(listFilesSelected.indexOf(e.target.value), 1);
        }
    }

    useEffect(() => {
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
            <button className="btn btn-outline mb-1" data-bs-toggle="modal" data-bs-target={"#modal-" + name}>Chọn</button>
            <div className="modal modal-blur fade" id={"modal-" + name} role="dialog" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Files</h3>
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
                            <input type="file" className="form-control" name={name} onChange={uploadMedia}/>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => {
                                let res = [];
                                listFilesSelected.map(id => {
                                    let item = ArrayUtils.findById('id', id, listFiles);
                                    // @ts-ignore
                                    res.push(item.path);
                                });
                                listFilesSelected = [];

                                const ms = document.getElementsByClassName('mediaselector');
                                for (var i = 0; i < ms.length; i++) {
                                    // @ts-ignore
                                    ms[i].checked = false;
                                }
                                callback(res);
                            }}>Chọn
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
