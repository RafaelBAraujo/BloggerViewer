import React, { PureComponent } from 'react'
import { Route, Switch } from 'react-router-dom'

import LoginPage from '../components/pages/LoginPage'
import Setup from '../components/pages/Setup'
import Home from '../components/pages/Home'
import Visualizer from '../components/pages/Visualizer'


class App extends PureComponent {

	constructor(){
		super()
		this.state = {
			blogUrl: ''
		}
	}

	setBlogUrl(blogUrl) {

	}

	render() {
		const App = () => (
			<div>
				<Switch>
					<Route exact path='/' component={() => <Setup setBlogAction={this.setBlogUrl} />}/>
					<Route exact path='/home' component={Home}/>
					<Route 
						exact 
						path='/visualizer' 
						component={() => <Visualizer />}/>
					<Route 
						exact 
						path='/visualizer/:blogId' 
						component={(props) => <Visualizer {...props} />}/>
					<Route 
						exact 
						path='/visualizer/:blogId/:postId' 
						component={(props) => <Visualizer {...props} />}/>
				</Switch>
			</div>
	)
	return (
		<Switch>
			<App/>
		</Switch>
		);
	}
}

export default App;