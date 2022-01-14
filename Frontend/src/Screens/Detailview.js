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
      id: this.props.location.state.id,
      filename: this.props.location.state.filename
    };
  }

async componentDidMount() {
   this.fetchWishlist()
   this.handleStarsPreview()
}

deleteTableRow = async (id) => {
  await axios({
    method: "DELETE",
    withCredentials: true,
    credentials: 'include',
    url: `${API_ENDPOINT}/api/game/${id}`,
    headers: { 'Content-Type': 'application/json' },
    data: {
        id: this.state.id,
        filename: this.state.filename
    }
}).then((response, props) => {
    console.log(response)
    if (response.data.success) {
      return window.location.replace("/overview");
    } else {
      return console.error();
    }
});
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

  handleStarsPreview = () => {
    if (this.props.location.state.stars === "1") {
      document.getElementById("1-star").checked = true;
      this.setState({ stars: "1" })
    } else if (this.props.location.state.stars === "2") {
      document.getElementById("2-stars").checked = true;
      this.setState({ stars: "2" })
    } else if (this.props.location.state.stars === "3") {
      document.getElementById("3-stars").checked = true;
      this.setState({ stars: "3" })
    } else if (this.props.location.state.stars === "4") {
      document.getElementById("4-stars").checked = true;
      this.setState({ stars: "4" })
    } else if (this.props.location.state.stars === "5") {
      document.getElementById("5-stars").checked = true;
      this.setState({ stars: "5" })
    }
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

                  <div style={{ marginLeft: '35px'  }}>
                    <div className="star-rating-detail">
                    )
                    <input type="radio" id="5-stars" name="rating" value="5" />
                    <label htmlFor="5-stars" className="star-detail">&#9733;</label>
                    <input type="radio" id="4-stars" name="rating" value="4" />
                    <label htmlFor="4-stars" className="star-detail">&#9733;</label>
                    <input type="radio" id="3-stars" name="rating" value="3" />
                    <label htmlFor="3-stars" className="star-detail">&#9733;</label>
                    <input type="radio" id="2-stars" name="rating" value="2" />
                    <label htmlFor="2-stars" className="star-detail">&#9733;</label>
                    <input type="radio" id="1-star" name="rating" value="1" />
                    <label htmlFor="1-star" className="star-detail">&#9733;</label>
                    (
                      <div className='gametitledetail'>{this.props.location.state.titlename}&nbsp;&nbsp;</div>
                    </div>
                  </div>

                   <h4 style={{ color: 'var(--text-primary)', marginLeft: '40px', marginTop: '4px' }}>{this.props.location.state.platform}</h4>
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
                state: {
                  description: this.props.location.state.description,
                  filename: this.props.location.state.filename,
                  title: this.props.location.state.titlename,
                  platform: this.props.location.state.platform,
                  price: this.props.location.state.price,
                  region: this.props.location.state.region,
                  ownage: this.props.location.state.ownage,
                  id: this.props.location.state.id,
                  wishlist: this.props.location.state.wishlist,
                  stars: this.props.location.state.stars,
                  box: this.props.location.state.box,
                  manual: this.props.location.state.manual
                }
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