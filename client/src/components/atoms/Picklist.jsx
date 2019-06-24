import React from 'react'
 
import { setManager } from '../scripts'

import { Form } from 'react-bootstrap'

const Picklist = ({items}) => {

    return (
        <div className="picklist">
            <Form>
                <Form.Group>
                    <Form.Label style={{width: '100%', textAlign: 'left'}}>Gestor</Form.Label>
                    <Form.Control as="select" className="manager-picklist" onChange={(event) => setManager(event.target.value)} >
                        {items.map(item => {
                            return (
                                <option key={item.RA} >
                                    {'RA: ' + item.RA + ', ' + item.Nome}
                                </option>
                            )
                        })}
                    </Form.Control>
                    <Form.Text className="text-muted" style={{width: '100%', textAlign: 'left'}}>
                        Escolha um aluno para gerir o tópico
                    </Form.Text>
                </Form.Group>
            </Form>
        </div>
    )

}

export default Picklist