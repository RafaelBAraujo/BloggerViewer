import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './home.css';

class Home extends Component {
  render() {
    return (
    <div className="App">
    
        <h1 className="welcome-text">Welcoming Text!</h1>

        <Link to={'./visualizer/adm_tec'}>
            <button className="blog" >Administração - TEC</button>
        </Link>

        <Link to={'./visualizer/adm_si'}>
            <button className="blog" >Administração - SI</button>
        </Link>

        <Link to={'./visualizer/tgs'}>
            <button className="blog" >Teoria Geral de Sistemas</button>
        </Link>

    </div>
    );
  }
}
export default Home;