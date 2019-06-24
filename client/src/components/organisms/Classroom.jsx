import React from 'react'

import ClassroomNav from '../molecules/ClassroomNav'

const Classroom = ({views}) => {

    return (
        <div className="classroom-nav">
            <ClassroomNav views={views} />
        </div>
    )

}


export default Classroom