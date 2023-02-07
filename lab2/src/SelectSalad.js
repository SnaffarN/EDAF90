import { useState } from 'react';

function SelectSalad(props) {
    const { label, value, options, onChange } = props

    return (
        <div class="form-group" style={{ marginBottom: 10 }}>
            <label>
                {label}
                <select class="form-select" value={value} onChange={onChange}>
                    <option value="">gör ditt val</option>
                    {options.map(option => <option value={option} key={option}>{option}</option>)}
                </select>
            </label>
        </div>
    );
}
export default SelectSalad;