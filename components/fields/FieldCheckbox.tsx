export function FieldCheckbox({setData, checked, label}) {
    return (
        <label className="form-check form-switch">
            <input className="form-check-input" type="checkbox"
                   defaultChecked={checked}
                   onChange={(e) => setData(e.target.checked)}
            />
            <span className="form-check-label">{label}</span>
        </label>
    );
}
