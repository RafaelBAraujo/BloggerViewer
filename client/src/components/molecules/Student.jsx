import React, { Component } from 'react'
import { Form } from 'react-bootstrap'

import StudentView from './StudentView';

class Student extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedStudent: { B: 0, S: 0, M: 0 }
        }

        this.selectStudent = (event) => {
            let name = event.target.value.split(',')[1]
            name = name.substr(1, name.length)

            this.props.students.forEach((student) => {
                if(student.Nome === name) {
                    this.setState({ selectStudent: student })
                }
            })

        }

    }

    render() {

        return (
            <div id="student" className="student">
                
                <div className="picklist">
                    <Form>
                        <Form.Group>
                            <Form.Control as="select" className="manager-picklist" onChange={(event) => this.selectStudent(event)} >
                                {this.props.students.map(student => {
                                    return (
                                        <option key={student.RA} >
                                            {'RA: ' + student.RA + ', ' + student.Nome}
                                        </option>
                                    )
                                })}
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </div>

                <StudentView student={this.state.selectedStudent} />
                <button className="btn btn-light">Salvar</button>
            </div>
        )
    }

}

export default Student