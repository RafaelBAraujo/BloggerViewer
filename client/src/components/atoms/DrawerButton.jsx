import React from 'react';

import { expandDrawer } from '../scripts'

const DrawerButton = () => {

    return(
        <div id="postsDrawer" className="posts">
            <button className="drawer-button" onClick={expandDrawer}><i className="material-icons">menu</i></button>
        </div>
    )

}

export default DrawerButton