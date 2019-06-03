import React, { Component } from 'react';

import Classroom from '../../components/classroom/Classroom'
import MenuBar from '../../components/menubar/MenuBar'
import Comments from '../../components/comments/Comments'
import DrawerButton from '../../components/menubar/DrawerButton'
import Drawer from '../../components/menubar/Drawer'
import Diagram from '../../components/diagram/Diagram'

import 'bootstrap/dist/css/bootstrap.css';
import './visualizer.css';

class Visualizer extends Component {

    render() {
        return (
            <div className='visualizer'>
                <Classroom />
                <MenuBar />
                <DrawerButton />
                <Drawer />
                <Diagram />
                <Comments />                
            </div>
        );
    }

}

export default Visualizer;