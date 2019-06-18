import React from 'react'

import DropdownButton from 'react-bootstrap'
import Dropdown from 'react-bootstrap'

const Picklist = ({label, items}) => {

    let itemCounter = 0

    return (
        <DropdownButton id="dropdown-basic-button" title="Dropdown button">
            {items.map(item => {
                return (
                    
                    <Dropdown.Item eventKey={itemCounter++}>{item}</Dropdown.Item>
                )
            })}
        </DropdownButton>
    )

}

export default Picklist