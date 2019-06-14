import React from 'react'

import '../../stylesheets/lds-spinner.css'

const LoaderScreen = () => {
    return(
        <div className="loading-overlay">
            <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    )
}

export default LoaderScreen