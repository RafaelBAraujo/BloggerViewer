import React from 'react'

import FilterSignContent from '../molecules/FilterSignContent'

const FilterSign = ({element}) => {
    return (
        <div className="filtersign">
            <FilterSignContent element={element} />
        </div>
    )
}

export default FilterSign