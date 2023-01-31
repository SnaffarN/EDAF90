import { useState } from 'react';

function SelectSalad(props) {
    const { label, value, options, onChange} = props

    return (
        <label>
            {label}
            <select value={value} onChange={onChange}>
                {options.map(option => <option value={option} key={option}>{option}</option>)}
            </select>
        </label>
    );
}
export default SelectSalad;