import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import '../css/login.css'

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'http://localhost/api/'


class Navbar extends Component {
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
        this.SetRegistration()
      }
      
        SetRegistration = async () => {
            if (this.state.registerstate === "enabeld") {
            return document.getElementById("register").style.display = "true";
          } else if (this.state.registerstate === "disabled") {
            return document.getElementById("register").style.display = 'none';
           
          }
        }
    render() {
        return(
            <div className="NavBar">
              
              <Link to="/" className="NavbarBrand" key="title" style={{marginLeft: "25px"}}>Game<b>Arch</b></Link>
              <Link to='/signup' id='register' className="navButtons" key="signup" style={{marginRight: "25px"}}>Signup</Link>
              <Link to='/login' key="login" className="navButtons">Login</Link>
              
            </div>
        )
    }
}

export default Navbar