import React, { Component } from 'react'
import axios from 'axios'
import '../../css/settings.css'


const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'http://localhost/api/'


class GeneralSettings extends Component {
  constructor() {
    super();
    this.state = {
       Currency: "", 
       isLoading: true, 
       isError: false,
       fetchcurrency: [],
       errorMessage: '',
       successMessage: '',
       isActive: false,
       isActiveSuccess: false,
       themes: [],
       theme: ''
    };
}
 
componentDidMount = async () => {
  const response = await fetch(`${API_ENDPOINT}/api/settingsdata`, {credentials: 'include'})
  if (response.ok) {
    const fetchcurrency = await response.json()
    this.setState({ fetchcurrency })
    this.state.fetchcurrency.map(actualtheme => {
    return this.setState({ theme: actualtheme.theme, fetchcurrency, Currency: actualtheme.currency, isLoading: false })
    })
  } else {
    this.setState({ isError: true, isLoading: false })
  }
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
           
          <div className="sectionDescription">General:</div>
           <form onSubmit={this.handleSubmit.bind(this)} method="POST" className="currencyInput" >
           
                  <label className='label' >
                    Currency:
                    <select
                      list="currencylist"
                      name="currency"
                      id="Currency"
                      className="currencydropdown"
                      value={this.state.Currency}
                      onChange={this.handleChange.bind(this)}
                      required
                    > 
                      <option>--Choose--</option>
                      <option>EUR</option>
                      <option>USD</option>
                      <option>BTC</option>
                    </select>
                 
                  </label>
                  <br></br>
                  <br />
                  <label className='label' >
                    Theme:
                    <select
                      list="themelist"
                      name="theme"
                      id="Theme"
                      className="currencydropdown"
                      value={this.state.theme}
                      onChange={this.handleChange.bind(this)}
                      required
                    > 
                      <option>--Choose--</option>
                      <option>dark</option>
                      <option>light</option>
                      <option>system</option>
                    </select>
                  </label>                  

                  {this.state.isActive ? <p style={{color: "red"}}>{this.state.errorMessage}</p> : null}
                  {this.state.isActiveSuccess ? <p style={{color: "green"}}>{this.state.successMessage}</p> : null}

                 <br /><br />

                 <button className="addButton">
                    Save
                 </button>
            </form>

          </div>
        </div>
    )
  }


renderCurrency = () => {
    return this.state.fetchcurrency.map(currencys => {

      return ( currencys.fetchcurrency )
    })
}


handleChange(event) {
  const field = event.target.id;

  if (field === "Currency") {
      this.setState({ Currency: event.target.value }); 
  } else if (field === "Theme") {
      this.setState({ theme: event.target.value });
  }
}
handleSubmit(event) {
event.preventDefault();

axios({
    method: "POST",
    withCredentials: true,
    credentials: 'include',
    url: `${API_ENDPOINT}/api/setcurrency`,
    headers: { 'Content-Type': 'application/json' },
    data: { currency: this.state.Currency, id: 1, theme: this.state.theme }
    
}).then((response, props) => {
    console.log(response)
    if (response.data.success) {
        console.log("Successfully changed");
        this.setState({
          successMessage: 'successfully updated settings!',
          isActive: false,
        })
        const root = document.querySelector(':root');
        root.setAttribute('color-scheme', `${this.state.theme}`);
        this.handleShowSuccess()
  } else if (response.data.error) {
    this.setState({errorMessage: 'Failed updating settings',})
    this.handleShow()
  }
});
}}


export default GeneralSettings