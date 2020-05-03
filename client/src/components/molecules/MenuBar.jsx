import React from 'react'

import Tab from '../atoms/Tab'
import SearchBar from '../atoms/SearchBar'
import DrawerButton from '../atoms/DrawerButton'
import ConfigButton from '../atoms/ConfigButton'
import ReturnButton from '../atoms/ReturnButton'

const MenuBar = ({color}) => {
    
    return(
        <div className="tabs" style={{backgroundColor: color}}>
            <ReturnButton />
            <Tab name="Classroom" className={'tab active-tab'} />
            <Tab name="Setup" className={'tab'} />
            <SearchBar />
            <ConfigButton />
            <DrawerButton />
        </div>
    )
    
}

export default MenuBar