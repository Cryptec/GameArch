import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import '../css/login.css'

class Navbar extends Component {
    render() {
        return(
            <div className="NavBar">
              
              <Link to="/" className="NavbarBrand" style={{marginLeft: "25px"}}>Workspace</Link>
              <Link to='/signup' className="navButtons" style={{marginRight: "25px"}}>Signup</Link>
              <Link to='/login' className="navButtons">Login</Link>
              
            </div>
        )
    }
}

export default Navbar