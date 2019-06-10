import React from 'react'

import { search } from '../scripts'

const SearchBar = () => {

    return(
        <div className="search-bar">
            <input type="text" name="query-input" onChange={search} placeholder="Keywords in here" />
            <i className="material-icons">search</i>
        </div>
    )
}

export default SearchBar