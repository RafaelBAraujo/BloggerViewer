import Mark from 'mark.js/dist/mark.js'
import React from 'react'

import { search } from '../scripts'

const SearchBar = () => {

    new Mark(document.querySelector('div.comment-content')).mark('Lorem');

    return(
        <div className="search-bar">
            <input type="text" onChange={search} placeholder="Keywords in here" />
            <i className="material-icons">search</i>
        </div>
    )
}

export default SearchBar