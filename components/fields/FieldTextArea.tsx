export function FieldTextArea({setData, value}) {
    return (
        <textarea value={value} onChange={(e) => setData(e.target.value)} rows={3} className="form-control"/>
    );
}
