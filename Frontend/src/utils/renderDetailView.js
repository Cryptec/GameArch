import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ImagePlaceholder from '../assets/imageplaceholder.png'
import Rendercurrency from '../utils/renderCurrency'

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

class RenderDetailView extends Component {
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

        <div className="overviewContainer">
           {this.renderGames()}
           <Link to='/addgame' className="addGamesButton">
             <div>add games</div>
             <div style={{fontSize: 50}}>+</div>
           </Link>
        </div>

      </div>
    )
}


renderGames = () => {

  return this.state.games.map(game => {

      const imageName = game.filename
      const id = game.id
      const title = game.title
      const price = game.price
      const description = game.description
      const region = game.region
      const ownage = game.ownage
      const manual = game.manual
      const box = game.box
      const platform = game.platform
      const wishlist = game.iswishlist
      const stars = game.stars
      const url = `${API_ENDPOINT}/uploads/${imageName}`
     
    return (
         
       <div key={game.id} className="gamesShow">

        <Link to={{ pathname: `/gamedetail/${title}`, 
                    state: { titlename: title,
                             description: description,
                             price: price,
                             id: id,
                             filename: imageName,
                             platform: platform,
                             region: region,
                             ownage: ownage,
                             manual: manual,
                             box: box,
                             wishlist: wishlist,
                             stars: stars }
                  }} >
        <div className="imageWrapper">
        
            {imageName !== "null" ? <img src={`${url}`} alt="" className="imagePreview" />
              : <img src={`${ImagePlaceholder}`} alt="" className="imagePreview" />}

        </div>
        </Link>
          <div className="gameTitle">{title}</div>
        <div className="bottomSection">
          <div className="gamePrice">{price}&nbsp;<Rendercurrency /></div>
            {game.ownage === "false" ? <div className="ownagePreviewFalse">{this.state.ownagePreviewFalse}</div> :
          <div className="ownagePreviewOk">{this.state.ownagePreviewOk}</div>}
         </div>
        </div>
      
    )
  })
}
}

export default RenderDetailView