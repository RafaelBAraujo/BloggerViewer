import React, {Component} from 'react'

import FileInput from '../molecules/FileInput'

import Node from '../molecules/Node'
import IconButton from '../atoms/IconButton'
import RoundPicture from '../atoms/RoundPicture'
import NodeText from '../atoms/NodeText'
import { cleanFilter, shortenAuthorName } from '../scripts'

const url = '//lh3.googleusercontent.com/zFdxGE77vvD2w5xHy6jkVuElKv-U9_9qLkRYK8OnbDeJPtjSZ82UPq5w6hJ-SA=s35'

class Classroom extends Component {

    constructor(props) {

        super(props)

        this.state = {
            selectedStudent: [],
            classroom: this.props.classroom,
            filteredStudents: this.props.classroom,
            file: 'undefined'
        }

        this.queryStudent = (input) => {

            let query = input.target.value
            let filteredStudents = []

            if(query !== "") {
                this.state.classroom.forEach((student) => {
                    if(student.Nome.match(new RegExp(query, 'gi'))) {
                        filteredStudents.push(student)
                    }
                })
                this.setState({
                    filteredStudents: filteredStudents
                })
            }
            else {
                this.setState({
                    filteredStudents: this.state.classroom
                })
            }

        }

    }

    selectStudent(studentRA) {
        this.state.classroom.forEach((student) => {
            if(student.RA === studentRA) {
                this.setState({
                    selectedStudent: [student]
                })
                this.props.getStudentDataAction(student.RA)
            }
        })
    }

    unselectStudent() {
        this.setState({
            selectedStudent: []
        })
        cleanFilter()
    }
    
    render() {
        let replyKeyCounter = 0

        return (
            <div className="classroom-nav">

                {this.state.classroom == null ? (
                    <div>
                        <p>Este blog ainda não possui uma planilha.</p>
                        <FileInput action={this.props.uploadFileAction} />
                    </div>
                ) : (
                    <div>
                        <div className="email-input quick-style">
                            <i className="material-icons">search</i>
                            <input type="text" placeholder={''} onKeyUp={this.queryStudent} />
                        </div>
                
                        <div>
                            <p>Selecionado</p>
                            <div className="node-list">
                            {this.state.selectedStudent.map((student) => {
                                return(
                                    <div className="node">
                                        <RoundPicture src={url} alt={student.Nome}/>
                                        <NodeText text={student.Nome} />
                                        <IconButton icon={'close'} onClick={() => this.unselectStudent()}/>
                                    </div>
                                )
                            })}
                            </div>
                        </div>
                
                        <div className="mt-2">
                            <p>Alunos</p>
                            <div className="node-list">
                            {this.state.filteredStudents.map((student) => {
                                return (
                                    <div onClick={() => this.selectStudent(student.RA)} >
                                        <Node key={++replyKeyCounter} imgSrc={url} imgAlt={''} text={shortenAuthorName(student.Nome)} />
                                    </div>
                                )
                            })}
                            </div>
                        </div>
                    </div>
                )}

            </div>
        )
    }

}


export default Classroom