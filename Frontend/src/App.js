  
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
import Forgot from './Screens/Forgot'
import ResetPassword from './Screens/ResetPassword'


class App extends Component {

  render() {
    return (
      <Router>
      <Switch>
        <PublicRoute restricted={false} component={Login} path="/login" exact />
        <PublicRoute restricted={false} component={Register} path="/signup" exact />
        <PublicRoute restricted={false} component={Forgot} path="/forgot" exact />
        <PublicRoute restricted={false} component={ResetPassword} path="/passreset" exact />
        
        <PrivateRoute restricted={false} component={Layout} />
      </Switch>
      </Router>
    );
  }
}

export default App;