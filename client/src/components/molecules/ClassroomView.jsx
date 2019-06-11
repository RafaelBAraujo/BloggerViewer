import React from 'react';
import NodeList from './NodeList'

import 'bootstrap/dist/css/bootstrap.css';


const ClassroomView = ({id, title, content}) => {

    let target = '#' + id

    return(
        <div className="classroom-view">
            <h2 className="mb-0">
                <div>
                    <button className="btn btn-link" data-toggle="collapse" data-target={target} aria-expanded="true" aria-controls={id}>
                        {title}
                        <i className="material-icons">keyboard_arrow_down</i>
                    </button>
                </div>
            </h2>
            <div id={id} className="collapse" data-parent="#accordion">
                <NodeList nodes={content} />
            </div>
        </div>
    )

}

export default ClassroomView;