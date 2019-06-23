import React from 'react'
 
import { Form } from 'react-bootstrap'

const Picklist = ({items}) => {

    return (
        <Form.Control as="select">
            {items.map(item => {
                return (
                    <option key={item} >
                        {item}
                    </option>
                )
            })}
        </Form.Control>
    )

}

export default Picklist