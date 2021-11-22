import React, { Component } from "react"
import Logo from "../assets/NK.svg"
import Loginform from "../components/loginform"
import Navbar from "../components/navbar"

import "../css/login.css"

class Login extends Component {
  render() {
    return (
      <div className='container'>
        
          <Navbar />
          <img src={Logo} alt='logo' className='logo'></img>
          <Loginform />
  
      </div>
    )
  }
}

export default Login
