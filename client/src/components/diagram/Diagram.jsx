import React, { Component } from 'react';

import Dropzone from 'react-dropzone'
import Button from '../atoms/Button'
import Picklist from '../atoms/Picklist'

import { uploadFile } from '../scripts'

class Diagram extends Component {

    constructor(props) {
        super(props)

        this.state = {
            file: null
        }
        
        this.onDrop = (files) => {
            this.setState({file: files[0]})
            console.log(this.state.file)
        }
        
    }
    
    render() {

        let file = this.state.file
        let items = []


        return(
            <div id="diagram" className="diagram">
                <Picklist label={'bla'} items={items} />
                <Dropzone onDrop={this.onDrop} noClick={true} noKeyboard={true} multiple={false} >
                    {({getRootProps, getInputProps, open}) => (
                    <div className="dropzone-wrapper">
                        <Button label={'Upload file'} onClick={() => uploadFile(file)} />
                        <div {...getRootProps({className: 'dropzone'})}>
                            <input {...getInputProps()} />
                            <p>Drag 'n' drop some files here</p>
                            <button type="button" className="btn btn-secondary" onClick={open}>
                                Open File Dialog
                            </button>
                        </div>
                    </div>
                    )}
                </Dropzone>
            </div>
        )
    }
}

export default Diagram;