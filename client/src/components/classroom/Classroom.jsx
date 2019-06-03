import React, { Component } from 'react';

import ClassroomView from './ClassroomView';

import 'bootstrap/dist/css/bootstrap.css';

class Classroom extends Component {

    render() {
        return (
            <ClassroomView title="Número de comentários"/>
        );
    }
}

export default Classroom;