import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import '../../stylesheets/home.css'

class Home extends Component {

	doSomething = () => {
		document.getElementById('crap').classList.toggle('hide')

		document.getElementById('crap2').classList.toggle('hidden')
	}

	render() {
		return (
			<div className="App">
			
				<div className="home-wrapper overlay">

					<h1 className="welcome-text">Sala de Aula 360 Graus</h1>

						<div className="home-menu">
							<button id="crap" className="home-menu-btn" type="button" onClick={() => this.doSomething()}>
								Visualizar um blog
							</button>
						</div>
						<div id="crap2" className="blog-links hidden">
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
				

			</div>
		);
	}
}
export default Home;