import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import '../../stylesheets/home.css'

class Home extends Component {
  render() {
    return (
    <div className="App">
    
        <h1 className="welcome-text">Sala de Aula 360 Graus</h1>

        <div className="blog-links">
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

    </div>
    );
  }
}
export default Home;