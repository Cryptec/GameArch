import React, { Component } from 'react'
import axios from 'axios'
import { userName, email } from '../../utils'
import '../../css/settings.css'


const API_ENDPOINT = window._env_.REACT_APP_API_ENDPOINT || 'http://localhost:5000'
const VERSION_NUMBER = '0.8.5 beta'


class SystemSettings extends Component {
  constructor() {
    super();
    this.state = {
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
           
           <div className="sectionDescription">System:</div>
           
           <form onSubmit={this.handleSubmit.bind(this)} method="POST" className="systemcontent">

         <div>
            version:<b> {VERSION_NUMBER}</b>
         </div>
         <br />
         <br />
         <div>
            email setup:
         </div>
         <br />
            <div>
                You can send an email to test everyting is setup correctly.
                If you hit 'Send' you should receive an email to <b>{this.state.email}</b>.
            </div>
            <p className='infotext'> &#9432; This setup is required for the 'forgot password' functionality.</p>
          <br />

          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>

          <button className='addButton'>Send</button>

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
          isActiveError: false,
          successMessage: 'An email was sent to you!',
        })
        console.log('Form sent')
        this.handleShowSuccess()
      } else if (response.data.answer === 'password_too_short') {
        console.log('Password length must be at least 4 characters long')
        this.setState({
          errorMessage: 'Password length must be at least 4 characters long.',
        })
        this.handleShowError()
      }
    })
  }
}


export default SystemSettings