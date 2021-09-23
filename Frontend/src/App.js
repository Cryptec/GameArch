  
import React, { Component } from 'react'
import PrivateRoute from './Routes/PrivateRoute'
import PublicRoute from './Routes/PublicRoute'
import {
  BrowserRouter as Router,
  Switch
} from "react-router-dom"

import Login from './Screens/Login'
import Register from './Screens/Register'
import Layout from './layout'


class App extends Component {

  render() {
    return (
      <Router>
      <Switch>
        <PublicRoute restricted={false} component={Login} path="/login" exact />
        <PublicRoute restricted={false} component={Register} path="/signup" exact />
        
        <PrivateRoute restricted={false} component={Layout} />
      </Switch>
      </Router>
    );
  }
}

export default App;