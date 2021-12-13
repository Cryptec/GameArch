import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ImagePlaceholder from '../assets/imageplaceholder.png'
import Rendercurrency from '../utils/renderCurrency'

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

class RenderListView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            games: [],
            isLoading: false,
            isError: false,
            ownagePreviewOk: <>&#10004;</>,
            ownagePreviewFalse: <>&#x2715;</>,
            file: false
        }
    }

async componentDidMount() {
        this.setState({ isLoading: true, file: ImagePlaceholder })
        const response = await fetch(`${API_ENDPOINT}/api/gamedata`, { credentials: 'include' })
        if (response.ok) {
            const games = await response.json()
            this.setState({ games, isLoading: false })
        } else {
            this.setState({ isError: true, isLoading: false })
        }
    }

render() {
        
        const { games, isLoading, isError } = this.state

    if (isLoading) {
      return <div>Loading...</div>
    }

    if (isError) {
      return <div>Error</div>
    }

    return games.length > 0
      ? (
      
        <div className="userstable">
        <table id="tblData"> 
          <tbody>
            {this.renderTableRows()}
            <tr>
            <Link to='/addgame' className="addGamesButtonList">
                <div>add games</div>
                <div style={{ fontSize: 50 }}>+</div>
            </Link>
            </tr>
          </tbody>
        </table>
        </div>
   
      ) : (
        <div>
          No games.
      </div>
      )
  }


renderTableRows = () => {
    return this.state.games.map(game => {

        const imageName = game.filename
        const url = `${API_ENDPOINT}/uploads/${imageName}`

      return (
        <tr key={game.id}>
          <td><img src={`${url}`} alt="" className="imagePreview" /></td>
          <td>{game.title}</td>
          <td>{game.price}</td>
          <td>{game.ownage}</td>
        </tr>
      )
    })
  }



    renderGames = () => {

        return this.state.games.map(game => {

            const imageName = game.filename
            const url = `${API_ENDPOINT}/uploads/${imageName}`

            return (

                <div key={game.id} className="gamesShow">

                    <img src={`${url}`} alt="" className="imagePreview" />
                    <div className="gameTitle">{game.title}</div>
                    <div className="bottomSection">
                        <div className="gamePrice">{game.price}&nbsp;<Rendercurrency /></div>
                        {game.ownage === "false" ? <div className="ownagePreviewFalse">{this.state.ownagePreviewFalse}</div> :
                            <div className="ownagePreviewOk">{this.state.ownagePreviewOk}</div>}
                    </div>
                </div>

            )
        })
    }
}

export default RenderListView