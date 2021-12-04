import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import '../css/login.css'

class Navbar extends Component {
    render() {
        return(
            <div className="NavBar">
              
              <Link to="/" className="NavbarBrand" key="title" style={{marginLeft: "25px"}}>Game<b>Arch</b></Link>
              <Link to='/signup' className="navButtons" key="signup" style={{marginRight: "25px"}}>Signup</Link>
              <Link to='/login' key="login" className="navButtons">Login</Link>
              
            </div>
        )
    }
}

export default Navbar