import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap'

import Node from '../molecules/Node'

class ClassroomView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: null,
        };
    }

    render() {
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
                        <div className="node-list">
                            <Node imgSrc="profile_pic.png" imgAlt="test" text="testText" value="10" />
                            <div className="node">
                                <img src="profile_pic.png" alt="test" className="node-img rounded-circle"/>
                                <span className="node-text" >Rafael Augusto</span>
                                <span className="node-text-number ml-5">38</span>
                            </div>
                    </div>
                </div>
            </div>

        </div>
        );
    }
}

export default ClassroomView;