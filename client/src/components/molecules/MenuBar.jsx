import React from 'react'

import Tab from '../atoms/Tab'
import DrawerButton from '../atoms/DrawerButton'

const MenuBar = () => {
    
    return(
        <div className="tabs">
            <Tab name="Diagram" />
            <Tab name="Comments" />
            <DrawerButton />
        </div>
    )
    
}

export default MenuBar