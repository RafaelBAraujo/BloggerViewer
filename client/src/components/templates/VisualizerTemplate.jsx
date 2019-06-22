import React from 'react'

import Classroom from '../../components/organisms/Classroom'
import MenuBar from '../../components/molecules/MenuBar'
import Drawer from '../../components/organisms/Drawer'
import Diagram from '../../components/diagram/Diagram'
import Post from '../../components/organisms/Post'

import 'mark.js'
import 'bootstrap/dist/css/bootstrap.css'
import '../../stylesheets/visualizer.css'

const VisualizerTemplate = ({data, action}) => {

    console.log('template data: ' + data)

    return(
        <div className='visualizer'>
            <Classroom views={data.classroomViews}/>
            <MenuBar />
            <Drawer postsList={data.postList} action={action} />
            <Diagram postId={data.post.id} />
            <Post title={data.post.title} content={data.post.content} comments={data.post.comments}/>
        </div>
    )

}

export default VisualizerTemplate