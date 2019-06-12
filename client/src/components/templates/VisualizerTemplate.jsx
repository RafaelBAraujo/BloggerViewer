import React from 'react'

import Classroom from '../../components/organisms/Classroom'
import MenuBar from '../../components/molecules/MenuBar'
import Drawer from '../../components/organisms/Drawer'
import Diagram from '../../components/diagram/Diagram'
import Post from '../../components/organisms/Post'

import 'mark.js'
import 'bootstrap/dist/css/bootstrap.css'
import '../../App/pages/visualizer.css'

const VisualizerTemplate = ({data, action}) => {

    console.log('template data: ' + data)

    return(
        <div className='visualizer'>
            <Classroom views={data.classroom}/>
            <MenuBar />
            <Drawer postsList={data.postsList} action={action} />
            <Diagram />
            <Post title={data.post.title} content={data.post.content} comments={data.post.comments}/>
        </div>
    )

}

export default VisualizerTemplate