import React from 'react'

import Tab from '../atoms/Tab'
import SearchBar from '../atoms/SearchBar'
import DrawerButton from '../atoms/DrawerButton'

const MenuBar = () => {
    
    return(
        <div className="tabs">
            <Tab name="Comments" className={'tab active-tab'} />
            <Tab name="Diagram" className={'tab'} />
            <SearchBar />
            <DrawerButton />
        </div>
    )
    
}

export default MenuBar