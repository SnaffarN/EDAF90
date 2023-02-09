import { useState } from 'react';

function SelectSalad(props) {
    const { label, value, options, onChange } = props

    return (
        <div className="form-group" style={{ marginBottom: 10 }}>
            <label>
                {label}
                <select className="form-select" value={value} onChange={onChange} required>
                    <option value="">gör ditt val</option>
                    {options.map(option => <option value={option} key={option}>{option}</option>)}
                </select>
                <div className="valid-feedback">
                    Looks good!
                </div>
                <div className="invalid-feedback">
                    bad
                </div>
            </label>
        </div>
    );
}
export default SelectSalad;