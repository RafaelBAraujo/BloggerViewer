import React, { Component } from 'react'

import VisualizerTemplate from '../templates/VisualizerTemplate'
import LoadingScreen from '../molecules/LoaderScreen'

class Visualizer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: {}
        }
    }

    componentDidMount() {
        console.log('mounted')
        this.getPostData()
    }

    getPostData = () => {
        console.log('fetching data...')
        fetch('/visualizer/12345')
        .then(res => res.json())
        .then(data => this.setState({ data }))
    }

    render() {

        const { data } = this.state

        return(
            <div>
                {Object.entries(data).length !== 0 && data.constructor === Object ? (
                        <LoadingScreen />
                    ) : (
                        <VisualizerTemplate data={data} />
                )
                }
            </div>
        )
    }

}

export default Visualizer