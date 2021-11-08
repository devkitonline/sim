export function FieldTextArea({setData, value, options = {maxLength: 0}}) {
    return (
        <textarea maxLength={options.maxLength ? options.maxLength : 5000} value={value} onChange={(e) => setData(e.target.value)} rows={3} className="form-control"/>
    );
}
