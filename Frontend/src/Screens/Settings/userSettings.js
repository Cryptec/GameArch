import React, { Component } from 'react'
import axios from 'axios'
import { userName, email } from '../../utils'
import '../../css/settings.css'


const API_ENDPOINT = window._env_.REACT_APP_API_ENDPOINT || 'http://localhost/api/'


class UserSettings extends Component {
  constructor() {
    super();
    this.state = {
        password: '',
        confirm_password: '',
        errorMessage: '',
        successMessage: '',
        name: '',
        email: '',
        isActiveError: false,
        isActiveSuccess: false
    };
}

async componentDidMount() {
    await this.setState({name: userName(), email: email()});
}

handleShowError = () =>{
    this.setState({
        isActiveError: true,
        isActiveSuccess: false
    })
    setTimeout(() => { this.setState({ isActiveError: false }) }, 3000);
}
handleShowSuccess = () =>{
    this.setState({
        isActiveSuccess: true,
        isActiveError: false,
    })
    setTimeout(() => { this.setState({ isActiveSuccess: false }) }, 3000);
}

render() {

    return (
      <div>
    
          <div className="overviewContainer" style={{display: 'block'}}>
           
           <div className="sectionDescription">User:</div>
           
           <form onSubmit={this.handleSubmit.bind(this)} method="POST" className="passwordInput">
           <div>set a new password for {this.state.name}:</div>
           <br />
           <label className='userlabel'>
              new password:
            </label>
            <input
              className='userSettingsInput'
              onChange={this.handleChange.bind(this)}
              id='password'
              value={this.state.password}
              type='password'
            />
          
          <br />
          <br />
            <label className='userlabel'>
              confirm password:
            </label>
            <input
              className='userSettingsInput'
              onChange={this.handleChange.bind(this)}
              id='confirm_password'
              value={this.state.confirm_password}
              type='password'
            />
          <br />
          <br />
          <br />
            <div>change the email address for {this.state.name}:</div>
          <br />
            <label className='userlabel'>
              change email:
            </label>
            <input
              className='userSettingsInput'
              onChange={this.handleChange.bind(this)}
              id='change_email'
              value={this.state.email}
              type='text'
              required
            />
            <br />
            <br />

          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>

          <button className='addButton'>Update</button>

            {this.state.isActiveError ? <div className="updateErrorMessage">{this.state.errorMessage}</div> : null}
            {this.state.isActiveSuccess ? <div className="updateSuccessMessage">{this.state.successMessage}</div> : null}
            
          </div>
        </form>

          </div>
        </div>
    )
  }


  handleSubmit(event) {
    event.preventDefault()
    if (this.state.password !== null) {
      document.getElementById("confirm_password").required = true;
      this.setState({
        errorMessage: "Please confirm the password"
      })
      if (this.state.password !== this.state.confirm_password) {
        console.log("The passwords doesn't match")
        this.setState({
          errorMessage: "The passwords doesn't match"
        })
        this.handleShowError()
        return false // The form won't submit
      }
    } 

    axios({
      method: 'POST',
      withCredentials: true,
      credentials: 'include',
      url: `${API_ENDPOINT}/api/updateuserdata`,
      headers: { 'Content-Type': 'application/json' },
      data: {
        password: this.state.password,
        name: this.state.name,
        email: this.state.email
      },
    }).then((response) => {
      if (response.data.answer === 'Success') {
        this.setState({
          password: '',
          confirm_password: '',
          isActiveError: false,
          successMessage: 'Data successfully changed!',
        })
        console.log('Form sent')
        localStorage.setItem("emailAddress", this.state.email)
        this.handleShowSuccess()
      } else if (response.data.answer === 'password_too_short') {
        console.log('Password length must be at least 4 characters long')
        this.setState({
          errorMessage: 'Password length must be at least 4 characters long.',
        })
        this.handleShowError()
      } else if (response.data.answer === 'Email_Changed') {
      this.setState({
        password: '',
        confirm_password: '',
        successMessage: 'email successfully changed!',
        isActiveError: false,
      })
      localStorage.setItem("emailAddress", this.state.email)
      console.log('successfully changed!')
      this.handleShowSuccess()
    }
    })
  }

  handleChange(event) {
    const field = event.target.id
    if (field === 'password') {
        this.setState({ password: event.target.value })
      } else if (field === 'confirm_password') {
        this.setState({ confirm_password: event.target.value })
      } else if (field === 'change_email') {
        this.setState({ email: event.target.value })
      }
  }
  handleConfirmPassword = (event) => {
    if (this.state.password !== null) {
      document.getElementById("confirm_password").required = true;
      this.setState({
        errorMessage: "Please confirm the password"
      })
      if (event.target.value !== this.state.regpassword) {
        console.log('error')
        this.setState({ regconfirm_password: event.target.value })
      }
    } 
  }
}


export default UserSettings