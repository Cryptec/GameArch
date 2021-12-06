import React, { Component } from "react"
import Navbar from "../components/navbar"
import axios from "axios"
import "../css/login.css"

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'http://localhost/api/'

class Forgot extends Component {
  constructor() {
    super();
    this.state = {
        email: "",
        answerOk: "Success",
        answerDenied: "Denied",
        errorMessage: '',
        successMessage: '',
        isActive: false,
        isActiveSuccess: false
    };
}

handleShow = () =>{
  this.setState({
      isActive: true,
      isActiveSuccess: false
  })
}
handleShowSuccess = () =>{
  this.setState({
      isActiveSuccess: true,
      isActive: false,
  })
}


  render() {

    let errorMessage = this.state.errorMessage
    let successMessage = this.state.successMessage

    return (
      <div className='container'>
      <Navbar />
        <div className="loginform" style={{marginTop: "150px"}}>
        <h3>Forgot your password?</h3>
        <br />
        
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

                 <button className="LoginButton">
                    Submit
                 </button>

                 {this.state.isActive ? <p className="errorTextLogin">{errorMessage}</p> : null}
                 {this.state.isActiveSuccess ? <p className="successTextLogin">{successMessage}</p> : null}

              </form>
        </div>
      </div>
    )
  }


handleChange(event) {
  const field = event.target.id;
  if (field === "email") {
      this.setState({ email: event.target.value });
  }
}

handleSubmit(event) {
event.preventDefault();

axios({
    method: "POST",
    withCredentials: true,
    credentials: 'include',
    url: `${API_ENDPOINT}/api/forgot`,
    headers: { 'Content-Type': 'application/json' },
    data: { email: this.state.email }
    
}).then((response, props) => {
    console.log(response)
    if (response.data.success) {
        this.setState({ email: "", successMessage: "An email was sent to you!" })
        this.handleShowSuccess()
        console.log("Success");
    } else if (response.data.answer === "UserError") {
        this.setState({ password: "", errorMessage: "Email don´t exist!" });
        this.handleShow()
        console.log("Email not found!");
    
    } 
});
}}

export default Forgot