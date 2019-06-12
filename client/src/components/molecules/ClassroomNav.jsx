import React  from 'react';

import ClassroomView from './ClassroomView'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap'

const ClassroomNav = ({views}) => {
    
    return(
        <div className="classroom accordion" id="accordion">
            {views.map(function(view) {
                return (
                    <ClassroomView key={view.id} title={view.title} content={view.content} id={view.id} />
                )
            })}
        </div>
    )
}

export default ClassroomNav