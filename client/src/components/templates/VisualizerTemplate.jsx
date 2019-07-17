import React from 'react'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Classroom from '../../components/organisms/Classroom'
import MenuBar from '../../components/molecules/MenuBar'
import Drawer from '../../components/organisms/Drawer'
import Diagram from '../../components/diagram/Diagram'
import Post from '../../components/organisms/Post'
import Students from '../organisms/Students'
import Tag from '../atoms/Tag'

import 'mark.js'
import 'popper.js'
import 'bootstrap/dist/css/bootstrap.css'
import '../../stylesheets/visualizer.css'

const VisualizerTemplate = ({data, blogColor, action, uploadClassDataAction, uploadFileAction}) => {

    console.log('template data: ' + data.classroom)

    return(
        <div className='visualizer'>
            
            <Classroom views={data.classroomViews}/>
            <MenuBar color={blogColor} />
            <Tag label={data.blog.name} />
            <ToastContainer hideProgressBar={true} />
            <Drawer postsList={data.postList} action={action} />
            <Diagram students={data.classroom.students} authors={data.authors} uploadFileAction={uploadFileAction} />
            <Post title={data.post.title} content={data.post.content} comments={data.post.comments}/>
            <Students students={data.classroom.students} uploadClassDataAction={uploadClassDataAction} />
        </div>
    )

}

export default VisualizerTemplate