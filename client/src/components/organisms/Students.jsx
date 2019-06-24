import React from 'react'

import { openStudentComponent } from '../scripts'

import Student from '../molecules/Student'

const Students = ({students}) => {

    return(
        <div className="students-wrapper">
            <div id="students" className="students">
                <button className="student-btn" onClick={openStudentComponent}>
                    <i className="material-icons">create</i>
                    <i className="material-icons">fast_forward</i>
                </button>
            </div>
            <Student students={students} />
        </div>
    )

}

export default Students