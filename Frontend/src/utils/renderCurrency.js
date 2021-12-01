import React, { Component } from 'react'

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

class Rendercurrency extends Component {
  constructor(props) {
    super(props)
    this.state = {
        isLoading: true, 
        isError: false,
        currency: []
    }
}

componentDidMount = async () => {
    const response = await fetch(`${API_ENDPOINT}/api/settingsdata`, {credentials: 'include'})
    if (response.ok) {
      const currency = await response.json()
      this.setState({ currency, isLoading: false })
    } else {
      this.setState({ isError: true, isLoading: false })
    }
}

  render() {

    return (
        <div>
           {this.renderCurrency()}
        </div>
    )
}

renderCurrency = () => {
    return this.state.currency.map(currencys => {

      return ( currencys.currency )
    })
  }
}

export default Rendercurrency
