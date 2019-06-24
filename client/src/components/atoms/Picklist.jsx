import React from 'react'
 
import { setManager } from '../scripts'

import { Form } from 'react-bootstrap'

const Picklist = ({label, items}) => {

    return (
        <div className="picklist">
            <Form>
                <Form.Group>
                    {typeof label !== 'undefined' ?
                        <Form.Label style={{width: '100%', textAlign: 'left'}}>{label}</Form.Label>
                        :
                        <Form.Label style={{width: '0%', height: '0%'}}></Form.Label>
                    }
                    <Form.Control as="select" className="manager-picklist" onChange={(event) => setManager(event.target.value)} >
                        <option>{'Alunos'}</option>
                        {items.map(item => {
                            return (
                                <option key={item.RA} >
                                    {'RA: ' + item.RA + ', ' + item.Nome}
                                </option>
                            )
                        })}
                    </Form.Control>
                </Form.Group>
            </Form>
        </div>
    )

}

export default Picklist