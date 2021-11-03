import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import {FetchApi} from "../helpers/fetchApi";

export default function App() {
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };
    function imageUploadHandler (blobInfo, success, failure, progress) {
        let data = new FormData();
        // @ts-ignore
        data.append('file', blobInfo.blob());
        FetchApi.postMedia('/api/media?make_public=true&name=upload', data)
        .then(res => {
            if (res.code == '1') {
                success(res.path);
            }
        });
    };
    return (
        <>
            <Editor
                apiKey='udlhcqegutgsjfdoqfmck9wtq72w3tq9oi6u02u7e9ndnv5y'
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue="<p>This is the initial content of the editor.</p>"
                init={{
                    height: 500,
                    menubar: false,
                    images_upload_handler: imageUploadHandler,
                    plugins: [
                        'link image code fullscreen media table paste image'
                    ],
                    toolbar: 'fullscreen formatselect | bold italic backcolor link | alignleft aligncenter alignright alignjustify | table | bullist numlist outdent indent | image media code'
                }}
            />
            <button onClick={log}>Log editor content</button>
        </>
    );
}
