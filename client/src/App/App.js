import React, { PureComponent } from 'react'
import { Route, Switch } from 'react-router-dom'

import LoginPage from '../components/pages/LoginPage'
import Home from '../components/pages/Home'
import Visualizer from '../components/pages/Visualizer'


class App extends PureComponent {
  render() {
    const App = () => (
      <div>
        <Switch>
          <Route exact path='/' component={LoginPage}/>
          <Route exact path='/home' component={Home}/>
          <Route exact path='/visualizer/adm_tec' component={() => <Visualizer blog={'adm_tec'} />}/>
          <Route exact path='/visualizer/adm_si' component={() => <Visualizer blog={'adm_si'} />}/>
          <Route exact path='/visualizer/tgs' component={() => <Visualizer blog={'tgs'} />}/>
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