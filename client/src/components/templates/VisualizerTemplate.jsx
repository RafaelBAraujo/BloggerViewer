import React from 'react'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Classroom from '../../components/organisms/Classroom'
import MenuBar from '../../components/molecules/MenuBar'
import Drawer from '../../components/organisms/Drawer'
import Diagram from '../../components/diagram/Diagram'
import Post from '../../components/organisms/Post'
import Students from '../organisms/Students'

import 'mark.js'
import 'bootstrap/dist/css/bootstrap.css'
import '../../stylesheets/visualizer.css'

const VisualizerTemplate = ({data, action, uploadFileAction}) => {

    console.log('template data: ' + data)

    return(
        <div className='visualizer'>
            <Classroom views={data.classroomViews}/>
            <MenuBar />
            <ToastContainer hideProgressBar={true} />
            <Drawer postsList={data.postList} action={action} />
            <Diagram students={data.classroom.students} uploadFileAction={uploadFileAction} />
            <Post title={data.post.title} content={data.post.content} comments={data.post.comments}/>
            <Students students={data.classroom.students} />
        </div>
    )

}

export default VisualizerTemplate