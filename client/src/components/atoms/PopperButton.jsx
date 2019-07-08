import React from 'react'

const PopperButton = ({icon, isHtml, data}) => {
    
    return(
        <button type="button" className="rounded-circle popper-btn" data-toggle="tooltip" data-placement="top" data-html={isHtml} title={data}>
            <i className="material-icons">{icon}</i>
        </button>
    )

}

export default PopperButton