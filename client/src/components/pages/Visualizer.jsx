import React, { Component } from 'react'

import VisualizerTemplate from '../templates/VisualizerTemplate'
import LoadingScreen from '../molecules/LoadingScreen'

import { uploadFile, uploadClass } from '../scripts'

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
        if(this.props.blog === 'adm_tec') {
            this.setState({ color: '#90A4AE' })
        } else if(this.props.blog === 'adm_si') {
            this.setState({ color: '#e8d1a5' })
        } else {
            this.setState({ color: '#c6cfd4' })
        }
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
        .then(() => console.log('I\'ve got: ' + this.state.classData))
    }

    uploadClassData = (classData) => {
        let { classroom } = this.state.data
        classroom.students = classData
        uploadClass(classroom)
        .then((res) => {
            console.log(res)
        })
    }

    uploadClassFile = (file) => {
        uploadFile(file, this.state.data.post.id)
        .then((res) => {
            if(res.statusText === 'OK') {
                this.setState({ data: {} })
                this.getPostData()
            }
        })
    }

    render() {

        const { data } = this.state
        
        return(
            <div>
                {Object.entries(data).length !== 0 && data.constructor === Object ? (
                        <VisualizerTemplate data={data} blogColor={this.state.color} classData={data.classroom} action={this.getPost} uploadClassDataAction={this.uploadClassData} uploadFileAction={this.uploadClassFile} />
                    ) : (
                        <LoadingScreen />
                )
                }
            </div>
        )
    }

}

export default Visualizer