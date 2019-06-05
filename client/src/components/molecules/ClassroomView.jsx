import React from 'react';
import NodeList from './NodeList'

import 'bootstrap/dist/css/bootstrap.css';


const ClassroomView = ({id, title, content}) => {

    const nodes = [
        { imgSrc: 'profile_pic.png', imgAlt: 'loopTest', text: 'Loop Test', value: '80'},
        { imgSrc: 'profile_pic.png', imgAlt: 'loopTest', text: 'Loop Test', value: '80'},
        { imgSrc: 'profile_pic.png', imgAlt: 'loopTest', text: 'Loop Test', value: '80'},
        { imgSrc: 'profile_pic.png', imgAlt: 'loopTest', text: 'Loop Test', value: '80'}
    ]

    let target = '#' + id

    return(
        <div className="classroom-view">
            <h2 className="mb-0">
                <button className="btn btn-link" data-toggle="collapse" data-target={target} aria-expanded="true" aria-controls={id}>
                    <i className="material-icons">keyboard_arrow_down</i>
                    {title}
                </button>
            </h2>
            <div id={id} className="collapse" data-parent="#accordion">
                <NodeList nodes={nodes} />
            </div>
        </div>
    )

}

export default ClassroomView;