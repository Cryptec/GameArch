import React, { Component } from "react"
import Navbar from "../components/navbar"
import Registerform from "../components/registerform"

import "../css/login.css"

class Register extends Component {
  render() {
    return (
      <div className='container'>
      <Navbar />
        <div className='Login'>
  
          <Registerform />
        </div>
      </div>
    )
  }
}

export default Register
