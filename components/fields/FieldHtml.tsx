import React, {useEffect, useRef, useState} from 'react';
import {Editor} from '@tinymce/tinymce-react';
import {FetchApi} from "../../helpers/fetchApi";

export default function FieldHtml({value, setContent}) {
    const [v, setV] = useState('');
    const [loadEditor, setLoadEditor] = useState(false);
    const editorRef = useRef(null);
    const imageUploadHandler = (blobInfo, success, failure, progress) => {
        progress(50);
        let data = new FormData();
        // @ts-ignore
        data.append('file', blobInfo.blob());
        FetchApi.postMedia('/api/media?make_public=true&name=upload', data)
        .then(res => {
            progress(100);
            if (res.code == '1') {
                success(res.path);
            } else {
                failure(res.message);
            }
        });
    };
    useEffect(() => {
        setV(value);
        setLoadEditor(true);
    }, []);
    return (
        <>
            {loadEditor ?
                <Editor
                    apiKey='udlhcqegutgsjfdoqfmck9wtq72w3tq9oi6u02u7e9ndnv5y'
                    onInit={(evt, editor) => editorRef.current = editor}
                    initialValue={v}
                    init={{
                        height: 400,
                        menubar: false,
                        images_upload_handler: imageUploadHandler,
                        plugins: [
                            'link image code fullscreen media table lists paste image'
                        ],
                        toolbar: 'fullscreen formatselect | bold italic backcolor link' +
                            ' | alignleft aligncenter alignright alignjustify | table ' +
                            '| bullist numlist outdent indent | image media code'
                    }}
                    onKeyUp={() => setContent(editorRef.current.getContent())}
                />
                :
                ''
            }
        </>
    );
}
