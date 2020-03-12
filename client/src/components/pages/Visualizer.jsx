import React, { Component } from 'react'

import VisualizerTemplate from '../templates/VisualizerTemplate'
import LoadingScreen from '../molecules/LoadingScreen'

import { uploadFile, uploadClass, downloadFile } from '../scripts'

class Visualizer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: {},
            color: null
        }
    }

    componentDidMount() {
        console.log('mounted')
        this.setState({ color: '#90A4AE' })
        this.getPostData()
    }

    getPostData = () => {
        console.log('fetching data...')
        fetch('/visualizer/'+ this.props.blog +'/getLastPost')
        .then(res => res.json())
        .then(data => this.setState({ data }))
    }

    getPost = (postId) => {
        this.setState({ data: {} })
        console.log('fetching data...')
        fetch('/visualizer/'+ this.props.blog +'/getPost/' + postId)
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
        console.log(this.state.data.post.id)
        window.location.replace("http://localhost:5000/getSpreadsheet/" + this.state.data.post.id);
    }

    render() {

        const { data } = this.state
        
        return(
            <div>
                {Object.entries(data).length !== 0 && data.constructor === Object ? (
                        <VisualizerTemplate data={data} blogColor={this.state.color} classData={data.classroom} action={this.getPost} uploadClassDataAction={this.uploadClassData} uploadFileAction={this.uploadClassFile} downloadAction={this.downloadSpreadsheet}/>
                    ) : (
                        <LoadingScreen />
                )
                }
            </div>
        )
    }

}

export default Visualizer