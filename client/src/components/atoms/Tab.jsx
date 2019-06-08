import React from 'react'

import { switchTab } from '../scripts'

const Tab = ({name}) => {

    return (
        <button id={name+'Tab'} className="tab" onClick={switchTab}>
            {name}
        </button>
    )

}

export default Tab