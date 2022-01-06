import React, { Component } from 'react'
import axios from 'axios'
import '../css/detailview.css'
import { Link } from "react-router-dom"
import Rendercurrency from '../utils/renderCurrency'
import ImagePlaceholder from '../assets/imageplaceholder.png'

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'http://localhost/api/'


class Detailview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wishstate: "",
      id: this.props.location.state.id
    };
  }

async componentDidMount() {
   this.fetchWishlist()
}

deleteTableRow = async (id) => {
  const response = await fetch(`${API_ENDPOINT}/api/game/${id}`, { credentials: 'include', method: 'DELETE' })
  if (response.ok) {
    await response.json()
    return window.location.replace("/overview");
  } else {
    return console.error();
  }
}

fetchWishlist = async () => {
  const response = await fetch(`${API_ENDPOINT}/api/game/${this.state.id}`, { credentials: 'include' })
  if (response.ok) {
    const wishstate = await response.json()
    return this.setState({ wishstate: wishstate.iswishlist })
  } else {
    return console.error();
  }
}
SetWishlist = async (id) => {
  await this.fetchWishlist()
    if (this.state.wishstate === "true") {
    return this.SetWishlistFalse(id)
  } else if (this.state.wishstate === "false") {
    return this.SetWishlistTrue(id)
   
  }
}

SetWishlistTrue = async (id) => {
  await axios({
    method: "POST",
    withCredentials: true,
    credentials: 'include',
    url: `${API_ENDPOINT}/api/setwishlist/${id}`,
    headers: { 'Content-Type': 'application/json' },
    data: { iswishlist: "true", id: id }
  })
  this.setState({ wishstate: "true" })
}

SetWishlistFalse = async (id) => {
  await axios({
    method: "POST",
    withCredentials: true,
    credentials: 'include',
    url: `${API_ENDPOINT}/api/setwishlist/${id}`,
    headers: { 'Content-Type': 'application/json' },
    data: { iswishlist: "false", id: id }
  })
  this.setState({ wishstate: "false" })
}
  render() {


    const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
    const gameTitle = this.props.location.state?.titlename
    const currency = <Rendercurrency />
    const url = `${API_ENDPOINT}/uploads/${this.props.location.state.filename}`
    const id = this.props.location.state.id

    return (

      <>

        {gameTitle ? (
          <div id="contentpage">
            <div className="pageContainer">

              <div className="HeaderContainer">
                <div className="imageWrapperDetail">

                  {this.props.location.state.filename !== "null" ? <img src={`${url}`} alt="" className="imagePreviewDetail" />
                    : <img src={`${ImagePlaceholder}`} alt="" className="imagePreviewDetail" />}

                </div>
                <div style={{ flexDirection: "column" }}>
                  <h1 style={{ color: 'var(--text-primary)', marginLeft: '45px' }}>{this.props.location.state.titlename}</h1>
                  <h4 style={{ color: 'var(--text-primary)', marginLeft: '45px', marginTop: '-12px' }}>{this.props.location.state.platform}</h4>
                </div>
              </div>
              <br /><br />
              <div className="descriptionContainer">
                <div style={{ color: 'var(--text-primary)' }}>{this.props.location.state.description}</div>
              </div>
              <br />
              <div className="BodyContainer" style={{ color: 'var(--text-primary)', flexDirection: 'column' }}>
                <div>{this.props.location.state.region}</div>
                <div className="gamePriceDetail">{this.props.location.state.price}&nbsp;{currency}</div>
              </div>


            </div>
            <div className="overviewContainer" style={{ marginTop: "5px" }}>

              {this.state.wishstate !== "true" ?
              <button onClick={() => this.SetWishlist(id)} className="WishlistButton">Add to Wishlist</button>
                : <button onClick={() => this.SetWishlist(id)} className="WishlistButton">at Wishlist</button> 
              }
            
              <Link className="GameEditButton" to={{
                pathname: `/editgame/${this.props.location.state.titlename}/${this.props.location.state.id}`,
                description: this.props.location.state.description,
                filename: this.props.location.state.filename,
                title: this.props.location.state.titlename,
                platform: this.props.location.state.platform,
                price: this.props.location.state.price,
                region: this.props.location.state.region,
                ownage: this.props.location.state.ownage,
                id: this.props.location.state.id,
                wishlist: this.props.location.state.wishlist
              }} >
                <div type="button">Edit</div>
              </Link>
              <button onClick={() => this.deleteTableRow(id)} className="GameDeleteButton">Delete</button>
            </div>
          </div>
        ) : (
          <div id="contentpage">
            <div className="overviewContainer">
              <h3 style={{ color: 'var(--text-primary)' }}>No Game Selected</h3>
            </div>
          </div>
        )}
      </>
    )
  }
}

export default Detailview