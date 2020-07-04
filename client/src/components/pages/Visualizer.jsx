import React, { Component } from 'react'

import VisualizerTemplate from '../templates/VisualizerTemplate'
import LoadingScreen from '../molecules/LoadingScreen'

import { uploadFile, uploadClass, getStudentData } from '../scripts'

class Visualizer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: {},
            postId: null,
            student: null,
            color: null
        }
    }

    componentDidMount() {
        console.log('mounted')
        
        this.setState({ color: '#90A4AE' })
        if(typeof this.props.match !== 'undefined') {
            const { blogId } = this.props.match.params
            const { postId } = this.props.match.params
            if(blogId && postId) {
                this.getPost(blogId, postId)
            } else {
                this.getPostData()
            }
        } else {
            this.getPostData()
        }

    }

    getPostData = () => {
        fetch('/visualizer/lastBlog/getLastPost')
        .then(res => res.json())
        .then(data => this.setState({ data }))
    }

    getPost = (blogId, postId) => {
        this.setState({ data: {} })
        console.log('fetching data...')
        fetch('/visualizer/'+ blogId +'/getPost/' + postId)
        .then(res => res.json())
        .then(data => this.setState({ data }))
    }

    getClassData = (postId) => {
        console.log('postId: ' + postId)
        fetch('/getClass/' + postId)
        .then(res => res.json())
        .then((classData) => this.setState({ classData }))
    }

    uploadClassData = (classData) => {
        let { classroom } = this.state.data
        classroom.students = classData
        classroom.postCode = this.state.data.postCode
        uploadClass(classroom, this.state.data.post.id)
    }

    uploadClassFile = (file) => {
        uploadFile(file, this.state.data.post.id, this.state.data.blog.id)
        .then((res) => {
            if(res.statusText === 'OK') {
                this.setState({ data: {} })
                this.getPostData()
            }
        })
    }

    downloadSpreadsheet = () => {
        console.log(this.state.data.blog.id)
        window.location.replace('http://localhost:5000/getSpreadsheet/'+this.state.data.blog.id+'/'+this.state.data.post.id)
    }

    getStudentData = (studentId) => {
        getStudentData(this.state.data.blog.id, studentId)
        .then(res => res.json())
        .then((student) => {
            this.setState({ student: student })
            console.log(student)
        })
    }

    render() {

        const { data } = this.state
        const { student } = this.state
        
        return(
            <div>
                {Object.entries(data).length !== 0 && data.constructor === Object ? (
                        <VisualizerTemplate data={data}
                                            student={student} 
                                            blogColor={this.state.color} 
                                            classData={data.classroom} 
                                            action={this.getPost} 
                                            uploadClassDataAction={this.uploadClassData} 
                                            uploadFileAction={this.uploadClassFile} 
                                            downloadAction={this.downloadSpreadsheet}
                                            getStudentDataAction={this.getStudentData}
                                            />
                    ) : (
                        <LoadingScreen />
                )
                }
            </div>
        )
    }

}

export default Visualizer