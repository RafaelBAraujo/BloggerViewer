import React from 'react';

import KeywordSetup from '../organisms/KeywordSetup';


const Diagram = ({keywords, blogId, postId}) => {

    return(
        <div id="diagram" className="diagram hide-view">
            <div className="summary-wrapper">
                <KeywordSetup keywords={keywords} blogId={blogId} postId={postId}/>
            </div>
        </div>
    )

}

export default Diagram