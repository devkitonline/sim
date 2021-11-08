import {convertToSlug} from "../../helpers/utils";

export function FieldSlug({setData, value, placeholder = ''}) {
    return (
        <input placeholder={placeholder} value={convertToSlug(value)} onChange={(e) => setData(e.target.value)} type="text" className="form-control"/>
    );
}
