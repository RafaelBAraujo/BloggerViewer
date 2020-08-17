import React from 'react'

import IconButton from '../atoms/IconButton'
import {switchView} from '../scripts'

const StudentsList = ({list}) => {

    return (
        <div id="xbla" className="students-list">
            <div>
                <IconButton icon={"chrome_reader_mode"} onClick={() => switchView('blogView')}/>
                <IconButton icon={"dashboard"} onClick={() => switchView('dashboard')}/>
            </div>
        </div>
    )

}

export default StudentsList