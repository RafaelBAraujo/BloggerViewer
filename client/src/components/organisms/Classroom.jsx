import React, { Component } from 'react'

import ClassroomNav from '../molecules/ClassroomNav'


class Classroom extends Component {

    constructor(props) {
        super(props)
        this.state = {
            views: this.props.views
        }
    }

    render(){
        const testViews = [
            { title: 'Número de Comentários', content: null, id: 'ncomments' },
            { title: 'Interações', content: null, id: 'interactions' },
            { title: 'Inativos', content: null, id: 'inactives' }
        ]
        return (
            <ClassroomNav views={testViews} />
        )
    }

}

export default Classroom