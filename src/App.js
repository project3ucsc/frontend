
import React from 'react'
import { BrowserRouter as Router,Switch,Route } from "react-router-dom";
import 'antd/dist/antd.css';
import Login from './Login'
import Home from './Home'
import Dashboard from './Dashboard'

import PrivateRoute from './utils/PrivateRoute'
import PublicRoute from './utils/PublicRoute'

function App() {
  return (
    <div className="App">
      <Router>

        <Switch>
          <Route exact path='/' component={Home} />
          <PublicRoute exact path='/login' component={Login} />
          <PrivateRoute exact path='/dashboard' component={Dashboard} />


        </Switch>


      </Router>
    </div>
  );
}

export default App;
