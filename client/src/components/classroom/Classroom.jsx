import React, { Component } from 'react';

import ClassroomView from './ClassroomView';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap'

class Classroom extends Component {

    render() {
        return (
            <div className="accordion classroom" id="accordion">
                <ClassroomView title="Número de comentários" content={null} id={'collapseOne'} />
                <ClassroomView title="Interações" content={null} id={'collapseTwo'} />
                <ClassroomView title="Inativos" content={null} id={'collapseThree'} />
            </div>
        );
    }
}

export default Classroom;