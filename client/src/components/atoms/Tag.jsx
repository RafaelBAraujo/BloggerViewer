import React from 'react'

const Tag = ({downloadAction}) => {

    return (
        <div className="tag">
            <div className="download-spreadsheet-wrap">
                <button type="button" className="btn btn-secondary download-spreadsheet-btn" onClick={downloadAction}>
                    <i className="material-icons">{'vertical_align_bottom'}</i>
                    Download spreadsheet
                </button>
            </div>
        </div>
    )

}

export default Tag