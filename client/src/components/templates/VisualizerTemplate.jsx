import React from 'react'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Classroom from '../../components/organisms/Classroom'
import MenuBar from '../../components/molecules/MenuBar'
import Drawer from '../../components/organisms/Drawer'
//import Diagram from '../../components/diagram/Diagram'
import Dashboard from '../organisms/Dashboard'
import Post from '../../components/organisms/Post'
import StudentsList from '../molecules/StudentsList'
import Tag from '../atoms/Tag'

import 'mark.js'
import 'popper.js'
import 'bootstrap/dist/css/bootstrap.css'
import '../../stylesheets/visualizer.css'
import '../../stylesheets/dashboard.css'

const VisualizerTemplate = ({data, student, blogColor, action, uploadClassDataAction, uploadFileAction, downloadAction, getStudentDataAction}) => {

    console.log('template data: ' + data.classroom)

    return(
        <div className='visualizer'>
            <Classroom classroom={data.classroom} uploadFileAction={uploadFileAction} getStudentDataAction={getStudentDataAction}/>
            <StudentsList />
            <MenuBar color={blogColor} />
            <Tag downloadAction={downloadAction} />
            <ToastContainer hideProgressBar={true} />
            <Drawer postsList={data.postList} action={action} />
            {/* <Diagram keywords={data.post.keywords} blogId={data.blog.id} postId={data.post.id}/> */}
            <Dashboard student={student} currentPostId={data.post.id} postList={data.postList}/>
            <Post title={data.post.title} content={data.post.content} comments={data.post.comments}/>
        
        </div>
    )

}

export default VisualizerTemplate