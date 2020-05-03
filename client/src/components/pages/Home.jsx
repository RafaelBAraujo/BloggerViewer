import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import '../../stylesheets/home.css'
import '../../../public/images/tech_bg.jpg'

class Home extends Component {

	doSomething = () => {
		document.getElementById('crap').classList.toggle('hide')


		document.getElementById('crap2').classList.toggle('hidden')
	}

	setDefaultBackground = () => {
		document.getElementById('app').classList.toggle('app-default-bg')
	}

	setDefaultBackground = () => {
		document.getElementById('app').style.backgroundImage = "url('https://firebasestorage.googleapis.com/v0/b/bloggerviewer-dccb0.appspot.com/o/tech_bg.jpg?alt=media&token=c245d3eb-7682-41bd-8b84-1be5d4666678')"
	}

	render() {
		return (
			<div id="app" className="App">
			
				<div className="home-wrapper overlay">

					<h1 className="welcome-text">Sala de Aula 360 Graus</h1>

					<div className="home-menu">
						<button id="crap" className="home-menu-btn" type="button" onClick={() => this.doSomething()}>
							Admininistrar blog
						</button>

						<div id="crap2" className="blog-links hidden">
							<Link to={'./visualizer/adm_tec'}>
								<button className="blog" onMouseOut={() => this.setDefaultBackground()} >Administração - TEC</button>
							</Link>

							<Link to={'./visualizer/adm_si'}>
								<button className="blog" onMouseOut={() => this.setDefaultBackground()} >Administração - SI</button>
							</Link>

							<Link to={'./visualizer/tgs'}>
								<button className="blog" onMouseOut={() => this.setDefaultBackground()} >Teoria Geral de Sistemas</button>
							</Link>
						</div>
					</div>

				</div>
				

			</div>
		);
	}
}
export default Home;