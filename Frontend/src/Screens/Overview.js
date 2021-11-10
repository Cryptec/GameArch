import React, { Component } from 'react'
import { Link } from 'react-router-dom'

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

class Overview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      games: [],
      isLoading: false,
      isError: false
    }
}

async componentDidMount() {
  this.setState({ isLoading: true })
  const response = await fetch(`${API_ENDPOINT}/api/gamedata`, {credentials: 'include'})
  if (response.ok) {
    const games = await response.json()
    this.setState({ games, isLoading: false })
  } else {
    this.setState({ isError: true, isLoading: false })
  }
}

  render() {

    return (
      <div>
    
        <div id="contentpage">
        <div className="overviewContainer">
           {this.renderGames()}
           <Link to='/addgame' className="addGamesButton">add games</Link>

        </div>
        </div>
      </div>
    )
}

renderGames = () => {
  return this.state.games.map(game => {

    return (

        <div key={game.id} className="games">{game.title}</div>

    )
  })
}
}

export default Overview