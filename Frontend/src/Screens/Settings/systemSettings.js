import React, { Component } from 'react'
import axios from 'axios'
import { userName, email } from '../../utils'
import '../../css/settings.css'


const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:5000'
const VERSION_NUMBER = '0.7.0'


class SystemSettings extends Component {
  constructor() {
    super();
    this.state = {
        errorMessage: '',
        successMessage: '',
        name: '',
        email: '',
        isActive: false,
        isActiveSuccess: false
    };
}

async componentDidMount() {
    await this.setState({name: userName(), email: email()});
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

    return (
      <div>
    
          <div className="overviewContainer">
           
           <div className="sectionDescription">System:</div>
           
           <form onSubmit={this.handleSubmit.bind(this)} method="POST" className="systemcontent">

         <div>
            version:<b> {VERSION_NUMBER}</b>
         </div>
         <br />
         <br />
            <div>
                You can send an email to test everyting is setup correctly.
                If you hit 'Send' you should receive an email to <b>{this.state.email}</b>.
            </div>
            <p className='infotext'> &#9432; This setup is required for the 'forgot password' functionality.</p>
          <br />
          <button className='addButton'>Send</button>

            {this.state.isActive ? <p style={{ color: "red" }}>{this.state.errorMessage}</p> : null}
            {this.state.isActiveSuccess ? <p style={{ color: "green" }}>{this.state.successMessage}</p> : null}
            
        </form>

          </div>
        </div>
    )
  }


  handleSubmit(event) {
    event.preventDefault()

    axios({
      method: 'POST',
      withCredentials: true,
      credentials: 'include',
      url: `${API_ENDPOINT}/api/testemail`,
      headers: { 'Content-Type': 'application/json' },
      data: {
        email: this.state.email
      },
    }).then((response) => {
      if (response.data.answer === 'Success') {
        this.setState({
          password: '',
          confirm_password: '',
          isActive: false,
          successMessage: 'An email was sent to you!',
        })
        console.log('Form sent')
        this.handleShowSuccess()
      } else if (response.data.answer === 'password_too_short') {
        console.log('Password length must be at least 4 characters long')
        this.setState({
          errorMessage: 'Password length must be at least 4 characters long.',
        })
        this.handleShow()
      }
    })
  }
}


export default SystemSettings