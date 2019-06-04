import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap'

import NodeList from '../molecules/NodeList'

class ClassroomView extends Component {

    constructor(props) {
        super(props);
        this.state = {
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
        return(
            <div className="accordion classroom" id="accordionExample">
                <div className="classroom-view">
                    <h2 className="mb-0">
                        <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            <i className="material-icons">keyboard_arrow_down</i>
                            Número de comentários
                        </button>
                    </h2>
                    
                    <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                        <NodeList nodes={nodes} />

                </div>
            </div>

        </div>
        );
    }
}

export default ClassroomView;