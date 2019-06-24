import React from 'react'

const RangeInput = ({id, value, action, min, max}) => {

    return (
        <div className="range-input">
            <label htmlFor={id}>{id+': ' + value}</label>
            <input id={id} value={value} type="range" className="custom-range" onChange={(event) => action(event)} min={min} max={max} step="0.5" />
        </div>
    )

}

export default RangeInput