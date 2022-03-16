import React, { Component } from "react"
import Navbar from "../components/navbar"
import axios from "axios"
import "../css/login.css"

const API_ENDPOINT = window._env_.REACT_APP_API_ENDPOINT || 'http://localhost/api/'

class ResetPassword extends Component {
    constructor() {
        super();
        this.state = {
            password: '',
            confirm_password: '',
            status: 'Submit',
            errorMessage: '',
            successMessage: '',
            isActive: false,
            isActiveSuccess: false
        }
    }

    handleShow = () => {
        this.setState({
            isActive: true,
            isActiveSuccess: false
        })
    }
    handleShowSuccess = () => {
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
                <div className="loginform" style={{ marginTop: "150px" }}>
                    <h3>Enter a new password:</h3>
                    <br />

                    <form onSubmit={this.handleSubmit.bind(this)} method="POST">
                        <label className='label'>
                            Password
                        <br />
                            <input
                                className='form-group-signup'
                                onChange={this.handleChange.bind(this)}
                                id='password'
                                value={this.state.password}
                                type='password'
                                required
                            />
                        </label>
                        <br />
                        <label className='label'>
                            Confirm Password
                        <br />
                            <input
                                className='form-group-signup'
                                onChange={this.handleChange.bind(this)}
                                id='confirm_password'
                                value={this.state.confirm_password}
                                type='password'
                                required
                            />
                        </label>

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
        if (field === 'password') {
            this.setState({ password: event.target.value })
        } else if (field === 'confirm_password') {
            this.setState({ confirm_password: event.target.value })
        }
    }

    handleConfirmPassword = (event) => {
        if (event.target.value !== this.state.password) {
            console.log('error')
            this.setState({ confirm_password: event.target.value })
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        axios({
            method: "POST",
            withCredentials: true,
            credentials: 'include',
            url: `${API_ENDPOINT}/api/reset-password`,
            headers: { 'Content-Type': 'application/json' },
            data: { password: this.state.password }

        }).then((response, props) => {
            console.log(response)
            if (response.data.success) {
                this.setState({ password: "", successMessage: "Successfully set new password" })
                this.handleShowSuccess()
                console.log("Success");
            } else if (response.data.answer === "UserError") {
                this.setState({ password: "", errorMessage: "Email don´t exist!" });
                this.handleShow()
                console.log("Email not found!");

            }
        });
    }
}

export default ResetPassword