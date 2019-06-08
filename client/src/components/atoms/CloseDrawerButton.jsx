import React from 'react'

import { closeDrawer } from '../scripts'

const CloseDrawerButton = () => {
    return (
        <a className="closebtn" onClick={closeDrawer}>
            <i className="material-icons">menu</i>
        </a>
    )
}

export default CloseDrawerButton