import React from 'react';

import Picklist from '../atoms/Picklist'
import FileInput from '../molecules/FileInput'
import ClassSummary from '../molecules/ClassSummary'

const Diagram = ({students, authors, uploadFileAction}) => {

    return(
        <div id="diagram" className="diagram hide-view">
            <div className="classroom-input-wrapper">
                <FileInput action={uploadFileAction} />
                <Picklist label={'Gestor'} items={students}/>
            </div>
            <div className="summary-wrapper">
                <ClassSummary students={authors} />
            </div>
        </div>
    )

}

export default Diagram