import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ImagePlaceholder from '../../assets/imageplaceholder.png'

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

class LastAdded extends Component {
  constructor(props) {
    super(props)
    this.state = {
      games: [],
      isLoading: false,
      isError: false,
      ownagePreviewOk: <>&#10004;</>,
      ownagePreviewFalse: <>&#x2715;</>,
      filter: localStorage.getItem('filter'),
      file: false
    }
}

async componentDidMount() {
  this.setState({ isLoading: true, file: ImagePlaceholder })
  const response = await fetch(`${API_ENDPOINT}/api/gamedata/${this.state.filter}`, {credentials: 'include'})
  if (response.ok) {
    const games = await response.json()
    this.setState({ games, isLoading: false })
  } else {
    this.setState({ isError: true, isLoading: false })
  }
}

  render() {

    return (
      
      <div className="overviewContainer" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column'}}>
        <h3 style={{ color: 'var(--text-primary)', marginLeft: '8px' }}>last added:</h3>
         <div style={{ display: 'flex', flexDirection: 'row-reverse', marginRight: 'auto'}}>
           {this.renderGames()}
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
      const purchasedate = game.purchasedate
      const description = game.description
      const region = game.region
      const released = game.released
      const ownage = game.ownage
      const manual = game.manual
      const box = game.box
      const platform = game.platform
      const wishlist = game.iswishlist
      const stars = game.stars
      const url = `${API_ENDPOINT}/uploads/${imageName}`
     
    return (
         
       <div key={game.id} >

        <Link to={{ pathname: `/gamedetail/${title}`, 
                    state: { titlename: title,
                             description: description,
                             price: price,
                             purchasedate: purchasedate,
                             id: id,
                             filename: imageName,
                             platform: platform,
                             region: region,
                             released: released,
                             ownage: ownage,
                             manual: manual,
                             box: box,
                             wishlist: wishlist,
                             stars: stars }
                  }} >
        <div className="imageWrapper" style={{margin: '8px', border: 'var(--border)'}}>
        
            {imageName !== "null" ? <img src={`${url}`} alt="" className="imagePreview" />
              : <img src={`${ImagePlaceholder}`} alt="" className="imagePreview" />}

        </div>
        </Link>

        </div>
      
    )
  })
}
}

export default LastAdded