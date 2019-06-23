import React from 'react';

import Picklist from '../atoms/Picklist'
import FileInput from '../atoms/FileInput'

const Diagram = ({uploadFileAction}) => {

    return(
        <div id="diagram" className="diagram hide-view">
            <Picklist items={['julia', 'lennon']}/>
            <FileInput action={uploadFileAction} />
        </div>
    )

}

export default Diagram;