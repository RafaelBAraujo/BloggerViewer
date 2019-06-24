import React from 'react';

import Picklist from '../atoms/Picklist'
import FileInput from '../molecules/FileInput'

const Diagram = ({students, uploadFileAction}) => {

    return(
        <div id="diagram" className="diagram hide-view">
            <Picklist items={students}/>
            <FileInput action={uploadFileAction} />
        </div>
    )

}

export default Diagram