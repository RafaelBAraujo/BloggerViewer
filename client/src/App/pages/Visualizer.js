import React, { Component } from 'react';

import Classroom from '../../components/classroom/Classroom'
import MenuBar from '../../components/menubar/MenuBar'
import Comments from '../../components/comments/Comments';
import DrawerButton from '../../components/menubar/DrawerButton'
import Drawer from '../../components/menubar/Drawer'

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
                <Comments />                
            </div>
        );
    }

}

export default Visualizer;