import React, { Component } from 'react'
import axios from 'axios'
import { userName } from '../../utils'
import '../../css/settings.css'


const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'http://localhost/api/'


class UserSettings extends Component {
  constructor() {
    super();
    this.state = {
        password: '',
        confirm_password: '',
        errorMessage: '',
        successMessage: '',
        name: '',
        isActive: false,
        isActiveSuccess: false
    };
}

async componentDidMount() {
    await this.setState({name: userName()});
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
      <div>
    
          <div className="overviewContainer">
           
           <div className="sectionDescription">User:</div>
           
           <form onSubmit={this.handleSubmit.bind(this)} method="POST" className="passwordInput">

           <label className='label'>
            new password:
            <input
              className='userSettingsInput'
              onChange={this.handleChange.bind(this)}
              id='password'
              value={this.state.password}
              type='password'
              required
            />
          </label>
          <br />
          <br />
          <label className='label'>
            confirm new Password:
            <input
              className='userSettingsInput'
              onChange={this.handleChange.bind(this)}
              id='confirm_password'
              value={this.state.confirm_password}
              type='password'
              required
            />
          </label>
          <br />
          <br />
          <button className='addButton'>Update</button>

          {this.state.isActive ? <p className="errorTextLogin">{errorMessage}</p> : null}
          {this.state.isActiveSuccess ? <p className="successTextLogin">{successMessage}</p> : null}
        </form>

          </div>
        </div>
    )
  }


  handleSubmit(event) {
    event.preventDefault()
    if (this.state.password !== this.state.confirm_password) {
      console.log("The passwords doesn't match")
      this.setState({ 
        errorMessage: "The passwords doesn't match"
      })
      this.handleShow()
      return false // The form won't submit
    } else this.setState({ status: 'Submitting' })

    axios({
      method: 'POST',
      withCredentials: true,
      credentials: 'include',
      url: `${API_ENDPOINT}/api/updatepassword`,
      headers: { 'Content-Type': 'application/json' },
      data: {
        password: this.state.password,
        name: this.state.name
      },
    }).then((response) => {
      if (response.data.answer === 'Success') {
        this.setState({
          password: '',
          confirm_password: ''
        })
        console.log('Form sent')
      } else if (response.data.answer === 'password_too_short') {
        console.log('Password length must be at least 4 characters long')
        this.setState({
          errorMessage: 'Password length must be at least 4 characters long.',
        })
        this.handleShow()
      } else if (response.data.answer === 'successfully_changed') {
      this.setState({
        password: '',
        confirm_password: '',
        successMessage: 'successfully changed!',
        isActive: false,
      })
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
      }
  }
  handleConfirmPassword = (event) => {
    if (event.target.value !== this.state.regpassword) {
      console.log('error')
      this.setState({ regconfirm_password: event.target.value })
    }
  }
}


export default UserSettings