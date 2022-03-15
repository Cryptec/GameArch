import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ImagePlaceholder from '../assets/imageplaceholder.png'
import Rendercurrency from './renderCurrency'

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

class RenderDetailView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      games: [],
      isLoading: false,
      isError: false,
      resolution: '',
      ownagePreviewOk: <>&#10004;</>,
      ownagePreviewFalse: <>&#x2715;</>,
      ownagePreviewSold: <> S </>,
      filter: localStorage.getItem('filter'),
      file: false,
    }
  }

  async componentDidMount() {
    this.fetchMode()
    this.setState({ isLoading: true, file: ImagePlaceholder })
    const response = await fetch(
      `${API_ENDPOINT}/api/gamedata/${this.state.filter}`,
      { credentials: 'include' }
    )
    if (response.ok) {
      const games = await response.json()
      this.setState({ games, isLoading: false })
    } else {
      this.setState({ isError: true, isLoading: false })
    }
  }

  fetchMode = async () => {
    const response = await fetch(`${API_ENDPOINT}/api/settingsdata`, {
      credentials: 'include',
    })
    if (response.ok) {
      const fetchdata = await response.json()
      this.setState({ fetchdata })
      this.state.fetchdata.map((data) => {
        return this.setState({ resolution: data.resolution })
      })
    } else {
      this.setState({ isError: true, isLoading: false })
    }
  }

  render() {
    return (
      <div>
        <div className='overviewContainer'>
          {this.renderGames()}
          <Link to='/addgame' className='addGamesButton'>
            <div>add games</div>
            <div style={{ fontSize: 50 }}>+</div>
          </Link>
        </div>
      </div>
    )
  }

  renderGames = () => {
    const filteredData = this.state.games.filter((el) => {
      if (this.props.input === '') {
        return el
      } else {
        return el.title.toLowerCase().includes(this.props.input)
      }
    })

    return filteredData.map((game) => {
      const imageName = game.filename
      const title = game.title
      const price = game.price
      const url = `${API_ENDPOINT}/uploads/${imageName}`

      return (
        <div key={game.id} className='gamesShow'>
          <Link to={{ pathname: `/gamedetail/${title}` }}>
            <div className='imageWrapper'>
              {imageName !== 'null' ? (
                <img src={`${url}`} alt='' className='imagePreview' />
              ) : (
                <img
                  src={`${ImagePlaceholder}`}
                  alt=''
                  className='imagePreview'
                />
              )}
            </div>
          </Link>
          <div className='gameTitle'>{title}</div>
          <div className='bottomSection'>
            <div className='gamePrice'>
              {price}&nbsp;
              <Rendercurrency />
            </div>

            {game.saleprice === '' && this.state.resolution === 'enabled' ? (
              <div>
                {game.ownage === 'false' ? (
                  <div className='ownagePreviewFalse'>
                    {this.state.ownagePreviewFalse}
                  </div>
                ) : (
                  <div className='ownagePreviewOk'>
                    {this.state.ownagePreviewOk}
                  </div>
                )}
              </div>
            ) : this.state.resolution === 'disabled' ? (
              <div>
                {game.ownage === 'false' ? (
                  <div className='ownagePreviewFalse'>
                    {this.state.ownagePreviewFalse}
                  </div>
                ) : (
                  <div className='ownagePreviewOk'>
                    {this.state.ownagePreviewOk}
                  </div>
                )}
              </div>
            ) : (
              <div className='ownagePreviewSold'>
                {this.state.ownagePreviewSold}
              </div>
            )}
          </div>
        </div>
      )
    })
  }
}

export default RenderDetailView