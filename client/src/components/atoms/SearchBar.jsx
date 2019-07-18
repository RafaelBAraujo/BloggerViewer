import React from 'react'

import { search } from '../scripts'

const SearchBar = () => {

    return(
        <div className="search-bar">
            <i className="material-icons">search</i>
            <input type="text" name="query-input" onKeyUp={search} placeholder="Keywords in here" />
        </div>
    )
}

export default SearchBar