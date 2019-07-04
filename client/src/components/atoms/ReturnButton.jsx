import React from 'react'

import { goToPreviousPage } from '../scripts'

const ReturnButton = () => {

    return (
        <div className="posts">
            <button className="btn-clear" onClick={goToPreviousPage} ><i className="material-icons">keyboard_backspace</i></button>
        </div>
    )

}

export default ReturnButton