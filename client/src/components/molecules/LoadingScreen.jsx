import React from 'react'

import '../../lds-spinner.css'

const LoaderScreen = () => {
    return(
        <div className="loading-overlay">
            <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    )
}

export default LoaderScreen