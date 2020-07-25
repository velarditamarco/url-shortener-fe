import React from 'react';
import './App.css';
import Home from './Home/home.js';
import Redirect from './redirect'
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom'
import { NotFound} from './Errors/erorrs.js'


class App extends React.Component {
  render(){
  return (
      <div className="App">
          <Router>
            <Switch>
              <Route path="/:shortLink" component={Redirect} />
              <Route path="/" component={Home} /> 
              <Route path="*" component = {NotFound} />
            </Switch>
          </Router>
      </div>
    );
  }
}


export default App;
