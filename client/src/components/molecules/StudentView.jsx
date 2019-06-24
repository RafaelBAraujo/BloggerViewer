import React, { Component } from 'react'

import CommentPicture from '../atoms/CommentPicture'
import RangeInput from '../atoms/RangeInput'

class StudentView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            student: this.props.student
        }

    }

    updateStudentScore = (event) => {

        let current = this.state.student
        if(event.target.id === 'Observou') {
            current.B = event.target.value
        } else if(event.target.id === 'Discutiu') {
            current.S = event.target.value
        } else {
            current.M = event.target.value
        }

        this.setState({ student: current })
        console.log(this.state.student)

    }

    render() {

        return(
            <div className="student-view">
                <CommentPicture src={'http://lh3.googleusercontent.com/zFdxGE77vvD2w5xHy6jkVuElKv-U9_9qLkRYK8OnbDeJPtjSZ82UPq5w6hJ-SA=s35'} alt={'http://lh3.googleusercontent.com/zFdxGE77vvD2w5xHy6jkVuElKv-U9_9qLkRYK8OnbDeJPtjSZ82UPq5w6hJ-SA=s35'} />
                <RangeInput id={'Observou'} value={this.state.student.B} action={this.updateStudentScore} min={0} max={3.5} />
                <RangeInput id={'Discutiu'} value={this.state.student.S} action={this.updateStudentScore} min={4} max={7.5} />
                <RangeInput id={'Analisou'} value={this.state.student.M} action={this.updateStudentScore} min={8} max={10} />
            </div>
        )
    }

}

export default StudentView