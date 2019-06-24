import React from 'react';

import Picklist from '../atoms/Picklist'
import FileInput from '../molecules/FileInput'

const Diagram = ({students, uploadFileAction}) => {

    return(
        <div id="diagram" className="diagram hide-view">
            <div className="classroom-input-wrapper">
                <FileInput action={uploadFileAction} />
                <Picklist label={'Gestor'} items={students}/>
            </div>
            <div className="classroom-summary">
                
            </div>
        </div>
    )

}

export default Diagram