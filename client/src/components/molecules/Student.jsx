import React, { Component } from 'react'
import { Form } from 'react-bootstrap'

//import StudentView from './StudentView';
import CommentPicture from '../atoms/CommentPicture'
import { closeStudentComponent } from '../scripts'

class Student extends Component {

    constructor(props) {
        super(props)
        this.state = {
            students: this.props.students,
            selectedStudent: { RA: 0, Nome: '', B: 0, S: 0, M: 0 }
        }
    }
    
    updateGrades = (event) => {

        let current = this.state.selectedStudent
        if(event.target.id === 'Observou') {
            current.B = event.target.value
        } else if(event.target.id === 'Discutiu') {
            current.S = event.target.value
        } else {
            current.M = event.target.value
        }

        this.setState({ selectedStudent: current })

        let { students } = this.state
        students.forEach((student) => {
            if(student.RA === current.RA) {
                student = current
            }
        })
        this.setState({ students: students })

    }

    selectStudent = (event) => {
        let ra = event.target.value.split(' ')[0]

        this.state.students.forEach((student) => {
            if(student.RA.toString() === ra) {
                this.setState({ selectedStudent: student })
            }
        })

    }

    uploadGrades = (event) => {

        closeStudentComponent(event)
        this.props.uploadClassDataAction(this.state.students)
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
                                            {student.RA + ' ' + student.Nome}
                                        </option>
                                    )
                                })}
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </div>

                <div className="student-view">
                    <CommentPicture src={'http://lh3.googleusercontent.com/zFdxGE77vvD2w5xHy6jkVuElKv-U9_9qLkRYK8OnbDeJPtjSZ82UPq5w6hJ-SA=s35'} alt={'http://lh3.googleusercontent.com/zFdxGE77vvD2w5xHy6jkVuElKv-U9_9qLkRYK8OnbDeJPtjSZ82UPq5w6hJ-SA=s35'} />
                    <div className="range-input">
                        <label htmlFor={'Observou'}>{'Observou: ' + this.state.selectedStudent.B}</label>
                         <input id={'Observou'} type="range" className="custom-range" onChange={(event) => this.updateGrades(event)} min={0} max={3.5} step="0.5" />
                    </div>
                    <div className="range-input">
                        <label htmlFor={'Discutiu'}>{'Discutiu: ' + this.state.selectedStudent.S}</label>
                        <input id={'Discutiu'} type="range" className="custom-range" onChange={(event) => this.updateGrades(event)} min={4} max={7.5} step="0.5" />
                    </div>
                    <div className="range-input">
                        <label htmlFor={'Analisou'}>{'Analisou: ' + this.state.selectedStudent.M}</label>
                        <input id={'Analisou'} type="range" className="custom-range" onChange={(event) => this.updateGrades(event)} min={8} max={10} step="0.5" />
                    </div>
                </div>
                {/* <StudentView student={this.state.selectedStudent} /> */}
                <button className="btn btn-light" onClick={(event) => this.uploadGrades(event)}>Salvar</button>
            </div>
        )
    }

}

export default Student