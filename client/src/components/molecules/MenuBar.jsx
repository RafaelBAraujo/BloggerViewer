import React from 'react'

import Tab from '../atoms/Tab'
import SearchBar from '../atoms/SearchBar'
import DrawerButton from '../atoms/DrawerButton'

const MenuBar = ({color}) => {
    
    return(
        <div className="tabs" style={{backgroundColor: color}}>
            <Tab name="Classroom" className={'tab active-tab'} />
            <SearchBar />
            <DrawerButton />
        </div>
    )
    
}

export default MenuBar