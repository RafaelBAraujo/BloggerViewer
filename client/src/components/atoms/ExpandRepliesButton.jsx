import React from 'react'
import { rotateIcon } from '../scripts'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap'

const ExpandRepliesButton = ({id, numOfReplies}) => {

    let target = '#' + id

    return(
        <button onClick={rotateIcon} className="expand-replies-btn" data-toggle="collapse" data-target={target} aria-expanded="true" aria-controls={id}>
            {`respostas (${numOfReplies})`}
            <i className="material-icons">keyboard_arrow_down</i>
        </button>
    )
    
}

export default ExpandRepliesButton