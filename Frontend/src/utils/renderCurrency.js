import React, { Component } from 'react'

const API_ENDPOINT = window._env_.REACT_APP_API_ENDPOINT

class Rendercurrency extends Component {
  constructor(props) {
    super(props)
    this.state = {
        isLoading: true, 
        isError: false,
        currency: [],
        fetchcurrency: ""
    }
}

componentDidMount = async () => {
    const response = await fetch(`${API_ENDPOINT}/api/public/currency`)
    if (response.ok) {
      const currency = await response.json()
      this.setState({ currency, isLoading: false })
    } else {
      this.setState({ isError: true, isLoading: false })
    }
    this.renderCurrency()
}

  render() {

    return (
        <div>
           {this.state.fetchcurrency}
        </div>
    )
}

renderCurrency = () => {
  const { currency } = this.state

  return currency.length > 0
            ? (this.state.currency.map(currencys => {

      if (currencys.currency === 'EUR') {
        this.setState({
          fetchcurrency: '€'
        })
      } else if (currencys.currency === 'USD') {
        this.setState({
          fetchcurrency: '$'
          })
      } else if (currencys.currency === 'BTC') {
        this.setState({
          fetchcurrency: '₿'
          })
      } 
      return (currencys.currency)

    })
            ) : (
                console.log("error fetching currency")
            )
  }
}

export default Rendercurrency
