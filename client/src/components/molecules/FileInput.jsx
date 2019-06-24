import React from 'react'

import { toast } from 'react-toastify'

class FileInput extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            file: 'undefined'
        }

        this.setFile = (event) => {
            this.setState({ file: event.target.files[0] })
        }

        this.sendFile = (event) => {
            if(this.state.file !== 'undefined') {
                this.props.action(this.state.file)
            } else {
                toast('Selecione um arquivo para fazer upload!', { position: 'top-center', autoClose: 2500 })
            }
        }

    }

    render() {
        return (
            <div className="file-upload">
                <h5>Upload da planilha</h5>
                <div className="input-group fuck">
                    <div className="custom-file">
                        <input id="classroom-file-input" type="file" className="custom-file-input" size="60" onChange={(event) => this.setFile(event)} />
                        <label id="classroom-file-input-label" className="custom-file-label" htmlFor="classroom-file-input">{this.state.file.name}</label>
                    </div>
                </div>
                <button className="btn btn-info" onClick={(event) => this.sendFile(event)}><i className="material-icons">cloud_upload</i>Upload</button>
            </div>
        )
    }

}

export default FileInput