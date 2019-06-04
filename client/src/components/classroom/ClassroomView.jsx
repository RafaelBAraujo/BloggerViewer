import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.css';

import NodeList from '../molecules/NodeList'

class ClassroomView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            title: '',
            content: null,
        };
    }

    render() {
        const nodes = [
            { imgSrc: 'profile_pic.png', imgAlt: 'loopTest', text: 'Loop Test', value: '80'},
            { imgSrc: 'profile_pic.png', imgAlt: 'loopTest', text: 'Loop Test', value: '80'},
            { imgSrc: 'profile_pic.png', imgAlt: 'loopTest', text: 'Loop Test', value: '80'},
            { imgSrc: 'profile_pic.png', imgAlt: 'loopTest', text: 'Loop Test', value: '80'}
        ]
        let target = '#' + this.props.id
        return(
            <div className="classroom-view">
                <h2 className="mb-0">
                    <button className="btn btn-link" data-toggle="collapse" data-target={target} aria-expanded="true" aria-controls={this.props.id}>
                        <i className="material-icons">keyboard_arrow_down</i>
                        {this.props.title}
                    </button>
                </h2>
                <div id={this.props.id} className="collapse" data-parent="#accordion">
                    <NodeList nodes={nodes} />
                </div>
            </div>
        );
    }
}

export default ClassroomView;