import React from 'react'

import FilterSignContent from '../molecules/FilterSignContent'

const FilterSign = ({element}) => {
    return (
        <div className="filtersign hide-filtersign">
            <FilterSignContent element={element} />
        </div>
    )
}

export default FilterSign