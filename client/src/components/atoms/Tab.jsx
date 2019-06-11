import React from 'react'

import { switchTab } from '../scripts'

const Tab = ({name, className}) => {

    return (
        <button id={name+'Tab'} className={className} onClick={switchTab}>
            {name}
        </button>
    )

}

export default Tab