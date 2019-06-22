import React from 'react'
import {useDropzone} from 'react-dropzone'

const Dropzone = () => {


    const {getRootProps, getInputProps, open, acceptedFiles} = useDropzone({
        // Disable click and keydown behavior
        noClick: true,
        noKeyboard: true
    });

    const files = acceptedFiles.map(file => (
        <p key={file.path}>
            {file.path}
        </p>
    ));

    return (
        <div className="dropzone-wrapper">
            <button type="button" className="btn btn-primary" onClick={open}>
                Open File Dialog
            </button>
            <div {...getRootProps({className: 'dropzone'})}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here</p>
                {files}
            </div>
        </div>
    );

}

export default Dropzone