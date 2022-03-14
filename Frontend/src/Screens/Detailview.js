import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Rendercurrency from '../utils/renderCurrency'
import ImagePlaceholder from '../assets/imageplaceholder.png'
import { LinkIcon } from '../assets/icons'

import '../css/detailview.css'
import '../css/imagemodal.css'

const API_ENDPOINT =
  process.env.REACT_APP_API_ENDPOINT || 'http://localhost:5000'
const SITE_URL = process.env.REACT_APP_SITE_URL || 'http://localhost:3000'

class Detailview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      game: [],
      resolution: '',
      imageName: '',
      price: '',
      saleprice: '',
      purchasedate: '',
      description: '',
      region: '',
      released: '',
      ownage: '',
      platform: '',
      wishlist: '',
      url: '',
      gameTitle: '',
      wishstate: '',
      id: '',
      stars: '',
      file: '',
      filename: '',
      title: '',
      module: '',
      manual: '',
      isownage: '',
      ismanual: '',
      isbox: '',
      box: '',
      cib: '',
      publiclink: '',
      successMessage: '',
      isActive: false,
    }
  }

  async componentDidMount() {
    await this.fetchGame()
    await this.fetchWishlist()
    await this.RenderOwnageState()
    await this.fetchMode()
  }

  deleteTableRow = async (id) => {
    await axios({
      method: 'DELETE',
      withCredentials: true,
      credentials: 'include',
      url: `${API_ENDPOINT}/api/game/${id}`,
      headers: { 'Content-Type': 'application/json' },
      data: {
        id: this.state.id,
        filename: this.state.filename,
      },
    }).then((response, props) => {
      console.log(response)
      if (response.data.success) {
        return window.location.replace('/overview')
      } else {
        return console.error()
      }
    })
  }

  fetchGame = async () => {
    this.setState({ file: ImagePlaceholder })
    const response = await fetch(
      `${API_ENDPOINT}/api/detail/${this.props.match.params.objecttitle}`,
      { credentials: 'include' }
    )
    if (response.ok) {
      const game = await response.json()
      document.getElementById(`${game.stars}-stars`).checked = true
      return this.setState({
        id: game.id,
        filename: game.filename,
        title: game.title,
        price: game.price,
        saleprice: game.saleprice,
        purchasedate: game.purchasedate,
        description: game.description,
        region: game.region,
        released: game.released,
        ownage: game.ownage,
        manual: game.manual,
        box: game.box,
        isownage: game.ownage,
        ismanual: game.manual,
        isbox: game.box,
        platform: game.platform,
        wishlist: game.iswishlist,
        stars: game.stars,
        gameTitle: game.title,
        publiclink: `${SITE_URL}/public/${game.id}/game/${this.props.match.params.objecttitle}`,
      })
    } else {
      this.setState({ isError: true, isLoading: false })
    }
  }

  fetchWishlist = async () => {
    const response = await fetch(`${API_ENDPOINT}/api/game/${this.state.id}`, {
      credentials: 'include',
    })
    if (response.ok) {
      const wishstate = await response.json()
      return this.setState({ wishstate: wishstate.iswishlist })
    } else {
      return console.error()
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
      return console.error()
    }
  }
  SetWishlist = async (id) => {
    await this.fetchWishlist()
    if (this.state.wishstate === 'true') {
      return this.SetWishlistFalse(id)
    } else if (this.state.wishstate === 'false') {
      return this.SetWishlistTrue(id)
    }
  }

  SetWishlistTrue = async (id) => {
    await axios({
      method: 'POST',
      withCredentials: true,
      credentials: 'include',
      url: `${API_ENDPOINT}/api/setwishlist/${id}`,
      headers: { 'Content-Type': 'application/json' },
      data: { iswishlist: 'true', id: id },
    })
    this.setState({ wishstate: 'true' })
  }

  SetWishlistFalse = async (id) => {
    await axios({
      method: 'POST',
      withCredentials: true,
      credentials: 'include',
      url: `${API_ENDPOINT}/api/setwishlist/${id}`,
      headers: { 'Content-Type': 'application/json' },
      data: { iswishlist: 'false', id: id },
    })
    this.setState({ wishstate: 'false' })
  }

  RenderOwnageState = () => {
    const ownage = this.state.ownage
    const box = this.state.box
    const manual = this.state.manual

    if (ownage === 'true') {
      this.setState({ module: 'Module' })
    } else {
      this.setState({ module: '' })
    }
    if (box === 'true') {
      this.setState({ box: ', Box' })
      if (ownage === 'false') {
        this.setState({ box: 'Box' })
      }
    } else {
      this.setState({ box: '' })
    }
    if (manual === 'true') {
      this.setState({ manual: ', Manual' })
    } else {
      this.setState({ manual: '' })
    }
  }

  Publiclink = () => {
    navigator.clipboard.writeText(this.state.publiclink)
    this.setState({
      successMessage: 'Public link copied to clipboard!',
      isActive: true,
    })
    setTimeout(() => {
      this.setState({ isActive: false })
    }, 3000)
  }

  getModal = () => {
    var modal = document.getElementById('myModal')

    // Get the image and insert it inside the modal - use its "alt" text as a caption
    var modalImg = document.getElementById('img01')
    const url = `${API_ENDPOINT}/uploads/${this.state.filename}`

    modal.style.display = 'block'
    modalImg.src = `${url}`
  }

  closeModal = () => {
    // When the user clicks on <span> (x), close the modal
    var modal = document.getElementById('myModal')
    modal.style.display = 'none'
  }

  render() {
    const url = `${API_ENDPOINT}/uploads/${this.state.filename}`
    const currency = <Rendercurrency />
    const id = this.state.id

    return (
      <>
        {this.props.match.params.objecttitle ? (
          <div id='contentpage'>
            <div className='pageContainer'>
              <div className='HeaderContainer'>
                <div className='imageWrapperDetail'>
                  {this.state.filename !== 'null' ? (
                    <img
                      src={`${url}`}
                      alt=''
                      id='gameImg'
                      onClick={this.getModal}
                    />
                  ) : (
                    <img
                      src={`${ImagePlaceholder}`}
                      alt=''
                      className='imagePreviewDetail'
                    />
                  )}
                </div>
                <div id='myModal' className='modal'>
                  <span className='close' onClick={this.closeModal}>
                    &times;
                  </span>
                  <img
                    className='modal-content'
                    alt='modal-content'
                    id='img01'
                  />
                </div>

                <div style={{ flexDirection: 'column' }}>
                  <div>
                    <div className='gametitledetail'>
                      {this.state.title}&nbsp;&nbsp;
                    </div>
                    <div style={{ display: 'inline-block' }}>
                      <div className='star-rating-detail'>
                        <input
                          type='radio'
                          id='5-stars'
                          name='rating'
                          value='5'
                        />
                        <label htmlFor='5-stars' className='star-detail'>
                          &#9733;
                        </label>
                        <input
                          type='radio'
                          id='4-stars'
                          name='rating'
                          value='4'
                        />
                        <label htmlFor='4-stars' className='star-detail'>
                          &#9733;
                        </label>
                        <input
                          type='radio'
                          id='3-stars'
                          name='rating'
                          value='3'
                        />
                        <label htmlFor='3-stars' className='star-detail'>
                          &#9733;
                        </label>
                        <input
                          type='radio'
                          id='2-stars'
                          name='rating'
                          value='2'
                        />
                        <label htmlFor='2-stars' className='star-detail'>
                          &#9733;
                        </label>
                        <input
                          type='radio'
                          id='1-stars'
                          name='rating'
                          value='1'
                        />
                        <label htmlFor='1-stars' className='star-detail'>
                          &#9733;
                        </label>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      marginTop: '-14px',
                    }}
                  >
                    <h4
                      style={{
                        color: 'var(--text-primary)',
                      }}
                    >
                      {this.state.platform}
                    </h4>
                    <h4 style={{ color: 'var(--text-primary)' }}>
                      &nbsp;({this.state.released})
                    </h4>
                  </div>
                </div>
              </div>
              <br />
              <br />
              <div className='descriptionContainer'>
                <div style={{ color: 'var(--text-primary)' }}>
                  {this.state.description}
                </div>
                <br />
              </div>
              <div className='BodyContainer'>
                <br />
                <div className='BodyContainerContentWraper'>
                  <div className='detailtable'>
                    <tbody id='detailtblData'>
                      <tr>
                        <td className='tdTitle'>In possession:</td>
                        {this.state.resolution === 'enabled' &&
                        this.state.saleprice !== '' ? (
                          <td className='tdContent'>SOLD</td>
                        ) : (
                          <td className='tdContent'>
                            {this.state.module}
                            {this.state.box}
                            {this.state.manual}
                          </td>
                        )}
                      </tr>
                      <tr>
                        <td className='tdTitle'>Region:</td>
                        <td className='tdContent'>{this.state.region}</td>
                      </tr>
                      <tr>
                        <td className='tdTitle'>Purchasedate:</td>
                        <td className='tdContent'>
                          {this.state.purchasedate === ''
                            ? '-'
                            : this.state.purchasedate}
                        </td>
                      </tr>
                      <tr>
                        <td className='tdTitle'>Price:</td>
                        <td className='tdContent'>
                          <div style={{ display: 'inline-flex' }}>
                            {this.state.price}&nbsp;{currency}
                          </div>
                        </td>
                      </tr>
                    </tbody>
                    <tbody id='detailtblData'>
                      <tr>
                        <td className='tdTitle'>Platform:</td>
                        <td className='tdContent'>{this.state.platform}</td>
                      </tr>
                      <tr>
                        <td className='tdTitle'>Rating:</td>
                        <td className='tdContent'>{this.state.stars}/5</td>
                      </tr>
                      <tr>
                        <td className='tdTitle'>Released:</td>
                        <td className='tdContent'>{this.state.released}</td>
                      </tr>
                      <tr>
                        <td className='tdTitle'>Wishlist:</td>
                        <td
                          className='tdContent'
                          style={{ color: 'var(--text-primary)' }}
                        >
                          {this.state.wishlist === 'true' ? '✔' : '✖'}
                        </td>
                      </tr>
                    </tbody>
                  </div>
                </div>
              </div>
              <br />
              <br />
            </div>
            <div className='overviewContainer' style={{ marginTop: '10px' }}>
              {this.state.wishstate !== 'true' ? (
                <button
                  onClick={() => this.SetWishlist(id)}
                  className='WishlistButton'
                >
                  ✖ | Wishlist
                </button>
              ) : (
                <button
                  onClick={() => this.SetWishlist(id)}
                  className='WishlistButton'
                >
                  ✔ | Wishlist
                </button>
              )}
              <div className='WishlistButton' onClick={() => this.Publiclink()}>
                <LinkIcon />
              </div>

              {this.state.isActive ? (
                <p className='shareMessage'>{this.state.successMessage}</p>
              ) : null}

              <Link
                className='GameEditButton'
                to={{
                  pathname: `/editgame/${this.props.match.params.objecttitle}/${this.state.id}`,
                  state: {
                    description: this.state.description,
                    filename: this.state.filename,
                    title: this.state.title,
                    platform: this.state.platform,
                    purchasedate: this.state.purchasedate,
                    price: this.state.price,
                    saleprice: this.state.saleprice,
                    region: this.state.region,
                    released: this.state.released,
                    ownage: this.state.isownage,
                    id: this.state.id,
                    wishlist: this.state.wishlist,
                    stars: this.state.stars,
                    box: this.state.isbox,
                    manual: this.state.ismanual,
                  },
                }}
              >
                <div type='button'>Edit</div>
              </Link>
              <button
                onClick={() => this.deleteTableRow(id)}
                className='GameDeleteButton'
              >
                Delete
              </button>
            </div>
          </div>
        ) : (
          <div id='contentpage'>
            <div className='overviewContainer'>
              <h3 style={{ color: 'var(--text-primary)' }}>No Game Selected</h3>
            </div>
          </div>
        )}
      </>
    )
  }
}

export default Detailview