import React, { Component } from 'react'
import axios from 'axios'
import Rendercurrency from '../utils/renderCurrency'
import '../css/settings.css'


const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'http://localhost/api/'


class Settings extends Component {
  constructor() {
    super();
    this.state = {
       Currency: "", 
       isLoading: true, 
       isError: false,
       fetchcurrency: []
    };
}
 
componentDidMount = async () => {
  const response = await fetch(`${API_ENDPOINT}/api/settingsdata`, {credentials: 'include'})
  if (response.ok) {
    const fetchcurrency = await response.json()
    this.setState({ fetchcurrency, isLoading: false })
  } else {
    this.setState({ isError: true, isLoading: false })
  }
}

render() {

    return (
      <div>
    
        <div id="contentpage">
          <div className="overviewContainer">

           <h3 style={{color: 'var(--text-primary)', marginLeft: "35px"}}>Settings</h3>
           
           <div className="sectionDescription">General</div>

           <form onSubmit={this.handleSubmit.bind(this)} method="POST" className="currencyInput">

                  <label>
                    Currency:
                    <select
                      list="currencylist"
                      name="currency"
                      id="Currency"
                      className="herstellerinput"
                      value={this.state.Currency}
                      onChange={this.handleChange.bind(this)}
                      required
                    > 
                      <option>{this.renderCurrency()}</option>
                      <option>EUR</option>
                      <option>USD</option>
                      <option>BTC</option>
                    </select>
                  </label>

                 <br />
                 <br />
                 <button className="addButton">
                    set currency
                 </button>
            </form>

          </div>
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
  } 
}
handleSubmit(event) {
event.preventDefault();
this.setState({ status: "Submit" });

axios({
    method: "POST",
    withCredentials: true,
    credentials: 'include',
    url: `${API_ENDPOINT}/api/setcurrency`,
    headers: { 'Content-Type': 'application/json' },
    data: { currency: this.state.Currency, id: 1 }
    
}).then((response, props) => {
    console.log(response)
    if (response.data.success) {
        this.setState({ Currency: "" })
        console.log("Successfully changed");
    } 
});
}}


export default Settings