export function FieldEnum({setData, value, options}) {
    return (
        <select defaultValue={value} onChange={(e) => setData(e.target.value)} className='form-control'>
            {Object.keys(options).map(key => {
                return (<option key={key} value={key}>{options[key]}</option>)
            })}
        </select>
    );
}
