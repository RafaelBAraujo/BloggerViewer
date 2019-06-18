import React, { Component } from 'react'

import VisualizerTemplate from '../templates/VisualizerTemplate'
import LoadingScreen from '../molecules/LoadingScreen'

class Visualizer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: {},
            classFile: null
        }
    }

    componentDidMount() {
        console.log('mounted')
        this.getPostData()
    }

    getPostData = () => {
        console.log('fetching data...')
        fetch('/visualizer/'+ this.props.blog +'/getLastPost')
        .then(res => res.json())
        .then(data => this.setState({ data }))

        fetch('/getClassSpreadsheet/serviceAccountKey.json')
        .then(classFile => this.setState({ classFile }))
        .then(() => console.log('got this file: ' + this.state.classFile.body))
    }

    getPost = (postId) => {
        this.setState({ data: {} })
        console.log('fetching data...')
        fetch('/visualizer/'+ this.props.blog +'/getPost/' + postId)
        .then(res => res.json())
        .then(data => this.setState({ data }))
    }

    render() {

        const { data } = this.state

        return(
            <div>
                {Object.entries(data).length !== 0 && data.constructor === Object ? (
                        <VisualizerTemplate data={data} action={this.getPost} />
                    ) : (
                        <LoadingScreen />
                )
                }
            </div>
        )
    }

}

export default Visualizer