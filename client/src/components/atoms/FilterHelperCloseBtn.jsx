import React from 'react'

import { cleanFilter } from '../scripts'

const CloseDrawerButton = () => {
    return (
        <button className="closebtn" onClick={cleanFilter}>
            <i className="material-icons">close</i>
        </button>
    )
}

export default CloseDrawerButton