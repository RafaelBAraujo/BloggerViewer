import React from 'react'

const FilterSignElement = ({element}) => {
    return (
        <div className="filtersign-element">
            Filter <i className="material-icons">chevron_right</i>> {element}
        </div>
    )
}

export default FilterSignElement