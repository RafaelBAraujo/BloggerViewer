import React from 'react';

import CloseDrawerButton from '../atoms/CloseDrawerButton'
import PostListItem from '../atoms/PostListItem'

const Drawer = ({postsList}) => {

    return(
        <div id="mySidenav" className="sidenav">
            <CloseDrawerButton />
            {postsList.map(function(post) {
                return(
                    <PostListItem postTitle={post.title}/>
                )
            })}
        </div>
    )

}

export default Drawer