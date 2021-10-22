import React, { useEffect, useRef } from "react";

export function Editor({ onChange, editorLoaded, name, value }) {
    const editorRef = useRef();
    // @ts-ignore
    const { CKEditor, ClassicEditor } = editorRef.current || {};

    useEffect(() => {
        // @ts-ignore
        editorRef.current = {
            CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
            ClassicEditor: require("@ckeditor/ckeditor5-build-classic")
        };
    }, []);

    return (
        <div>
            {editorLoaded ? (
                <CKEditor
                    type=""
                    name={name}
                    editor={ClassicEditor}
                    data={value}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        console.log({ event, editor, data })
                        onChange(data);
                    }}
                />
            ) : (
                <div>Editor loading</div>
            )}
        </div>
    );
}
