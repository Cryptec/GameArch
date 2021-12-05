import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ImagePlaceholder from '../assets/imageplaceholder.png'
import Rendercurrency from '../utils/renderCurrency'

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

class Overview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      games: [],
      isLoading: false,
      isError: false,
      file: false
    }
}

async componentDidMount() {
  this.setState({ isLoading: true, file: ImagePlaceholder })
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
           <Link to='/addgame' className="addGamesButton">
             <div>add games</div>
             <div style={{fontSize: 50}}>+</div>
           </Link>
        </div>
        </div>
      </div>
    )
}

renderGames = () => {
  return this.state.games.map(game => {

      const imageName = game.filename
      const url = `${API_ENDPOINT}/uploads/${imageName}`


    return (

        <div key={game.id} className="gamesShow">

          <img src={`${url}`} alt="" />
          <div className="gameTitle">{game.title}</div>
          <div className="gamePrice">{game.price}&nbsp;<Rendercurrency /></div>
          
        </div>

    )
  })
}
}

export default Overview
