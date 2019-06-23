import React from 'react'

class FileInput extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            file: {}
        }

        this.setFile = (event) => {
            this.setState({ file: event.target.files[0] })
        }

    }

    render() {
        return (
            <div className="file-upload">
                <h4>Upload da planilha</h4>
                <div className="input-group">
                    <div className="custom-file">
                        <input id="classroom-file-input" type="file" className="custom-file-input" size="60" onChange={(event) => this.setFile(event)} />
                        <label id="classroom-file-input-label" className="custom-file-label" htmlFor="classroom-file-input">{this.state.file.name}</label>
                    </div>
                </div>
                <button className="btn btn-info" style={{backgroundColor: 'red !important;'}} onClick={() => this.props.action(this.state.file)}><i className="material-icons">cloud_upload</i>Upload</button>
            </div>
        )
    }

}

export default FileInput