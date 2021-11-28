import React, { Component } from "react"
import Logo from "../assets/GameArchLogo.svg"
import Loginform from "../components/loginform"
import Navbar from "../components/navbar"

import "../css/login.css"
import Slogan from "../utils/slogan"

class Login extends Component {
  render() {
    return (
      <div className='container'>
        
          <Navbar />
          <img src={Logo} alt='logo' className='logo'></img>
          <Slogan />
          <Loginform />
  
      </div>
    )
  }
}

export default Login
