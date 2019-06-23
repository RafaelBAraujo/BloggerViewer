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
            <div className="input-group">
                <button onClick={() => this.props.action(this.state.file)}>Upload</button>
                <div className="custom-file">
                    <input id="classroom-file-input" type="file" className="custom-file-input" onChange={(event) => this.setFile(event)} />
                    <label id="classroom-file-input-label" className="custom-file-label" htmlFor="classroom-file-input">{this.state.file.name}</label>
                </div>
            </div>
        )
    }

}

export default FileInput