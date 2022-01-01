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
        
  return (
      
        <div className="userstable">
        <table id="tblData"> 
          <tbody>
            {this.renderTableRows()}
          </tbody>
        </table>
        <div>
            <Link to='/addgame' className="addGamesButtonList">
                <div>add games</div>
                <div style={{ fontSize: 50 }}>+</div>
            </Link>
        </div>
        </div>
  )}


renderTableRows = () => {
  const { games, isLoading, isError } = this.state

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error</div>
  }
  
  return games.length > 0
  ? (
     this.state.games.map(game => {

       const imageName = game.filename
       const id = game.id
       const title = game.title
       const price = game.price
       const description = game.description
       const region = game.region
       const filename = game.filename
       const platform = game.platform
       const url = `${API_ENDPOINT}/uploads/${imageName}`

      return (
        <tr key={game.id}>
          <Link to={{
            pathname: `/gamedetail/${title}`,
            state: { titlename: title },
            description: description,
            price: price,
            id: id,
            filename: filename,
            platform: platform,
            region: region
          }} >
          <td><img src={`${url}`} alt="" style={styles.imagePreviewList} /></td>
          </Link>
          <td><div style={styles.title}>{game.title}</div>
               <br />
               <div style={styles.platform}>{game.platform}</div>
          </td>
          <td>{game.ownage}</td>
          <td><div style={styles.price}>{game.price}&nbsp;<Rendercurrency /></div></td>
        </tr>
      )
    })
    ) : (
        <div>
          No games.
      </div>
      )
  }




}

const styles = {};

styles.imagePreviewList = {
  maxWidth: '180px',
  width: 'auto',
  maxHeight: '120px',
  height: 'auto',
  alignSelf: 'center',
  marginTop: '12px',
  borderRadius: '5px'
}
styles.title = {
  fontWeight: '600'
}
styles.platform = {
  marginTop: '-50px'
}
styles.price = {
  padding: '7px',
  fontWeight: 600,
  width: 'fit-content',
  borderRadius: '7px',
  color: 'var(--text-primary)',
  backgroundColor: 'var(--hilight)',
  justifyContent: 'center',
  flexDirection: 'row',
  display: 'flex'
}

export default RenderListView