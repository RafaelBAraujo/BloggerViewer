import React, { Component } from 'react'

import VisualizerTemplate from '../templates/VisualizerTemplate'
import LoadingScreen from '../molecules/LoadingScreen'
import Button from '../atoms/Button'

import { uploadClass } from '../scripts'

class Visualizer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: {},
            classData: {}
        }
    }

    componentDidMount() {
        console.log('mounted')
        this.getPostData()
        this.getClassData()
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
        fetch('/getClass/' + postId)
        .then(res => res.json())
        .then((classData) => this.setState({ classData }))
        .then(() => console.log('I\'ve got: ' + this.state.classData))
    }

    render() {

        const { data } = this.state
        const { classData } = this.state

        return(
            <div>
                {Object.entries(data).length !== 0 && data.constructor === Object ? (
                        <VisualizerTemplate data={data} classData={classData} action={this.getPost} />
                    ) : (
                        <LoadingScreen />
                )
                }
            </div>
        )
    }

}

export default Visualizer