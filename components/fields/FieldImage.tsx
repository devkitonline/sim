import {FetchApi} from "../../helpers/fetchApi";
import Image from "next/image";

export function FieldImage({name, setData, value}) {
    const uploadMedia = () => {
        let input = document.querySelector(`input[name="${name}"]`);
        let data = new FormData();
        // @ts-ignore
        data.append('file', input.files[0]);
        FetchApi.postMedia('/api/upload', data)
        .then(res => {
            if (res.code == '1') {
                setData(res.location);
            }
        });
    }
    return (
        <>
            <input type="file" className="form-control" name={name} onChange={uploadMedia}/>
            {value ? <Image objectFit="contain" width="150" height="150" src={value}/> : ''}
        </>
    );
}
