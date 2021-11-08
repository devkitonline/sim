import Select from "react-select";
import {useEffect, useState} from "react";

export function FieldMultiEnum({setData, value, options}) {
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        setLoaded(true);
    });
    return (
        <>
            {loaded ? <Select options={options} value={value} onChange={(e) => setData(e)} isMulti={true}/> : ''}
        </>
    );
}
