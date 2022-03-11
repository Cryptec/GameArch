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
       isActiveError: false,
       isActiveSuccess: false,
       registration: '',
       resolution: '',
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
    return this.setState({ theme: actualtheme.theme, fetchcurrency, Currency: actualtheme.currency, registration: actualtheme.registration, resolution: actualtheme.resolution, isLoading: false })
    })
  } else {
    this.setState({ isError: true, isLoading: false })
  }
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
           
          <div className="sectionDescription">General:</div>
           <form onSubmit={this.handleSubmit.bind(this)} method="POST" className="currencyInput" >
           
                 <label className='generallabel' >
                  Currency:
                 </label>
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
                 
                  <br></br>
                  <br />
                  <label className='generallabel' >
                   Theme:
                  </label>
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
                    <br></br>
                  <br />
                  <label className='generallabel' >
                   Registration:
                  </label>
                    <select
                      list="registratonlist"
                      name="Registration"
                      id="Registration"
                      className="currencydropdown"
                      value={this.state.registration}
                      onChange={this.handleChange.bind(this)}
                      required
                    > 
                      <option>--Choose--</option>
                      <option>enabled</option>
                      <option>disabled</option>
                    </select>              
                    <br></br>
                    <br />
                  <label className='generallabel' >
                   Resolution:
                  </label>
                    <select
                      list="resolutionlist"
                      name="Resolution"
                      id="Resolution"
                      className="currencydropdown"
                      value={this.state.resolution}
                      onChange={this.handleChange.bind(this)}
                      required
                    > 
                      <option>--Choose--</option>
                      <option>enabled</option>
                      <option>disabled</option>
                    </select>              
                    <br></br>
                    <br />
            <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>

            <button className="addButton">
              Save
            </button>

            {this.state.isActiveError ? <div className="updateErrorMessage">{this.state.errorMessage}</div> : null}
            {this.state.isActiveSuccess ? <div className="updateSuccessMessage">{this.state.successMessage}</div> : null}
           
            </div>
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
  } else if (field === "Registration") {
    this.setState({ registration: event.target.value });
  } else if (field === "Resolution") {
    this.setState({ resolution: event.target.value });
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
    data: { currency: this.state.Currency, registration: this.state.registration, resolution: this.state.resolution, id: 1, theme: this.state.theme }
    
}).then((response, props) => {
    console.log(response)
    if (response.data.success) {
        console.log("Successfully changed");
        this.setState({
          successMessage: 'successfully updated settings!',
          isActiveError: false,
        })
        const root = document.querySelector(':root');
        root.setAttribute('color-scheme', `${this.state.theme}`);
        this.handleShowSuccess()
  } else if (response.data.error) {
    this.setState({errorMessage: 'Failed updating settings',})
    this.handleShowError()
  }
});
}}


export default GeneralSettings