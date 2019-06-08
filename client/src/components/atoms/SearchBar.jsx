import React from 'react'

import { search } from '../scripts'

const SearchBar = () => {
    return(
        <div className="search-bar">
            <input type="text" onChange={search} placeholder="Type keywords here" />
            <i className="material-icons">search</i>
        </div>
    )
}

export default SearchBar