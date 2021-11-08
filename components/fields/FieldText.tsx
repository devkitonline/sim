export function FieldText({setData, value}) {
    if (value == null) value = '';
    return (
        <input value={value} onChange={(e) => setData(e.target.value)} type="text" className="form-control"/>
    );
}
