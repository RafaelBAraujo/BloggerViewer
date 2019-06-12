import React from 'react'

import FilterHelperElement from '../atoms/FilterHelperElement'
import FilterHelperCloseBtn from '../atoms/FilterHelperCloseBtn'

const FilterSignContent = ({element}) => {
    return (
        <div className="filtersign-content">
            <FilterHelperElement element={element}/>
            <FilterHelperCloseBtn />
        </div>
    )
}

export default FilterSignContent