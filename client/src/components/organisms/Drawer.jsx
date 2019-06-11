import React from 'react';

import CloseDrawerButton from '../atoms/CloseDrawerButton'
import PostListItem from '../atoms/PostListItem'

const Drawer = ({postsList, action}) => {

    return(
        <div id="mySidenav" className="sidenav">
            <CloseDrawerButton />
            {postsList.map(function(post) {
                return(
                    <PostListItem key={post.id} postId={post.id} postTitle={post.title} action={action} />
                )
            })}
        </div>
    )

}

export default Drawer