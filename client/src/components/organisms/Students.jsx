import React from 'react'

import { openStudentComponent } from '../scripts'

import Student from '../molecules/Student'

const Students = ({students, uploadClassDataAction}) => {

    return(
        <div className="students-wrapper">
            <div id="students" className="students">
                <button className="student-btn" onClick={openStudentComponent}>
                    <i className="material-icons">create</i>
                    
                </button>
            </div>
            <Student students={students} uploadClassDataAction={uploadClassDataAction} />
        </div>
    )

}

export default Students