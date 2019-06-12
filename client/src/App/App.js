import React, { PureComponent } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import Home from './pages/Home';
import List from './pages/List';
import Visualizer from '../components/pages/Visualizer';


class App extends PureComponent {
  render() {
    const App = () => (
      <div>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/visualizer/adm_tec' component={() => <Visualizer blog={'adm_tec'} />}/>
          <Route exact path='/visualizer/adm_si' component={() => <Visualizer blog={'adm_si'} />}/>
          <Route exact path='/visualizer/tgs' component={() => <Visualizer blog={'tgs'} />}/>
          <Route path='/list' component={List}/>
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