import React from 'react'

const FilterSignElement = ({element}) => {
    return (
        <div className="filtersign-element">
            <span>Filter</span>
            <i className="material-icons">chevron_right</i>
            <span className="filter-element">{element}</span>
        </div>
    )
}

export default FilterSignElement