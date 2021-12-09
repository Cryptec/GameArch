import React, { Component } from 'react'
import axios from "axios"
import { withRouter, Link } from 'react-router-dom'
import login from '../utils'

import '../css/login.css'

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'http://localhost/api/'

class Loginform extends Component {
  constructor() {
    super();
    this.state = {
        email: "",
        password: "",
        status: "Submit",
        answerOk: "Success",
        answerDenied: "Denied",
        errorMessage: "",
        isActive: false
    };
}

handleShow = () =>{
    this.setState({
        isActive: true
    })
}
    render() {

        let errorMessage = this.state.errorMessage

        return(
            <div className="loginform">
              <form onSubmit={this.handleSubmit.bind(this)} method="POST">
                 <label className="label">
                 Email 
                 <br />
                  <input
                    className="form-group-login"
                    onChange={this.handleChange.bind(this)}
                    id="email"
                    value={this.state.email}
                    type='text'
                    required

                  />
                 </label>
                 <br />
                 <label className="label">
                 Password 
                 <br />
                  <input
                    className="form-group-login"
                    onChange={this.handleChange.bind(this)}
                    id="password"
                    value={this.state.password}
                    type='password'
                    required

                  />
                 </label>
                 
                 <div className="forgotButton">
                 <Link to='/forgot' style={{textDecoration: "none", color: "black", fontSize: "14px"}}>forgot?</Link>
                 </div>
                 <br />
                 <button className="LoginButton">
                    Login
                 </button>

                 {this.state.isActive ? <p className="errorTextLogin">{errorMessage}</p> : null}

              </form>
            </div>
        )
    }

    handleChange(event) {
      const field = event.target.id;
      if (field === "email") {
          this.setState({ email: event.target.value });
      } else if (field === "password") {
          this.setState({ password: event.target.value });
      }
  }

  handleLogin = (any) => {
      console.log("Saving object: " + JSON.stringify(any))
      login(any);
      this.props.history.push('/')
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ status: "Submit" });

    axios({
        method: "POST",
        withCredentials: true,
        credentials: 'include',
        url: `${API_ENDPOINT}/api/login`,
        headers: { 'Content-Type': 'application/json' },
        data: { username: this.state.email, password: this.state.password}
        
    }).then((response, props) => {
        console.log(response)
        if (response.data.success) {
            localStorage.setItem("userName", response.data.name);
            this.setState({ email: "", password: "", status: "Logged in" })
            this.handleLogin(response)
            console.log("Login Success");
        } else if (response.data.answer === "UserError") {
            this.setState({ password: "", status: "Logging in" });
            this.setState({ errorMessage: "Wrong email or password!" });
            this.setState({ status: "Submit" });
            this.handleShow()
            console.log("Email not found!");
        
        } else if (response.data.answer === "PassError") {
            this.setState({ password: "", status: "Logging in" });
            this.setState({ errorMessage: "Wrong Password!" });
            this.setState({ status: "Submit" });
            this.handleShow()
            console.log("Wrong Password!");
        
        } else if (response.data.answer === this.state.answerDenied) {
            this.setState({ password: "", status: "Logging in" });
            this.setState({ errorMessage: "Wrong Email or Password" });
            this.setState({ status: "Submit" });
            this.handleShow()
            console.log("Wrong Email or Password");

        }
    });
}
}

export default withRouter(Loginform);