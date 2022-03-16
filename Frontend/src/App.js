  
import React, { Component } from 'react'
import PrivateRoute from './Routes/PrivateRoute'
import PublicRoute from './Routes/PublicRoute'
import {
  BrowserRouter as Router, Switch
} from "react-router-dom"
import Login from './Screens/Login'
import Register from './Screens/Register'
import PublicDetailview from './Screens/PublicScreens/PublicDetailview'
import PublicWishlist from './Screens/PublicScreens/PublicWishlist'
import Layout from './layout'
import Forgot from './Screens/Forgot'
import Redirect from './utils/Redirect'

const API_ENDPOINT = window._env_.REACT_APP_API_ENDPOINT || 'http://localhost/api/'

class App extends Component {
  constructor() {
    super()
    this.state = {
      registration: [],
      registerstate: ""
    }
  }
  componentDidMount = () => {
    this.isRegistration()
  }

  
isRegistration = async () => {
  const response = await fetch(`${API_ENDPOINT}/api/registrationstate`, { credentials: 'include' })
  if (response.ok) {
    const registration = await response.json()
    this.setState({ registration })
    this.state.registration.map(register => {
    this.setState({registerstate: register.registration})
    return(true)
    })
  } else {
    console.log("error")
  }
}

  render() {

    return (
      <Router>
      <Switch>
        <PublicRoute restricted={false} component={Login} path="/login" exact />

        {this.state.registerstate === 'disabled' 
        ? <PrivateRoute restricted={false} component={Register} path="/signup" exact /> 
        : <PublicRoute restricted={false} component={Register} path="/signup" exact /> 
        }
        <PublicRoute restricted={false} component={Forgot} path="/forgot" exact />
        <PublicRoute restricted={false} component={Redirect} path="/redirect" exact />
        <PublicRoute restricted={false} component={PublicDetailview} path="/public/:objectid/game/:objecttitle" exact />
        <PublicRoute restricted={false} component={PublicWishlist} path="/public/wishlist" exact />

        
        <PrivateRoute restricted={false} component={Layout} />
      </Switch>
      </Router>
    )}
}

export default App;