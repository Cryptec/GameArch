import React, { Component } from 'react'
import axios from 'axios'
import ImagePlaceholder from '../assets/imageplaceholder.png'
import Rendercurrency from '../utils/renderCurrency'
import '../css/overview.css'
import '../css/addnew.css'

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'http://localhost/api/'

class AddGame extends Component {
  constructor() {
    super()
    this.state = {
      title: '',
      platform: '',
      price: '',
      ownage: '',
      box: '',
      manual: '',
      region: '',
      description: '',
      released: '',
      ownagePreviewOk: '',
      ownagePreviewFalse: '',
      stars: '',
      file: 'null',
      preview: null,
    }
  }

  componentDidMount = () => {
    this.setState({
      preview: ImagePlaceholder,
      ownage: 'false',
      box: 'false',
      manual: 'false',
      region: 'PAL',
      stars: '3',
      ownagePreviewFalse: <>&#x2715;</>,
    })
    this.handleShow()
    document.getElementById('3-stars').checked = true
  }
  handleShow = () => {
    document.getElementById('ownagefieldset').style.borderColor =
      'rgb(209, 13, 13)'
  }
  handleShowSuccess = () => {
    document.getElementById('ownagefieldset').style.borderColor = 'green'
  }
  handleTitlePreview = () => {
    if (this.state.title === '') {
      return 'Game Title'
    } else if (this.state.title) {
      return this.state.title
    }
  }
  handlePricePreview = () => {
    if (this.state.price === '') {
      return '0,00'
    } else if (this.state.price) {
      return this.state.price
    }
  }
  removeImage = () => {
    document.getElementById('image').value = null
    this.setState({ preview: ImagePlaceholder, file: 'null' })
  }

  render() {
    return (
      <div id='contentpage'>
        <form
          onSubmit={this.handleSubmit.bind(this)}
          method='POST'
          encType='multipart/form-data'
        >
          <div className='addcontainer'>
            <div className='contentContainerInput'>
              <div className='inputForm'>
                <div className='gamesPreview'>
                  <div
                    type='button'
                    className='imgDelButton'
                    onClick={() => this.removeImage()}
                  >
                    &#x2715;
                  </div>

                  <div className='imageWrapper' style={{ marginTop: '-25px' }}>
                    <img
                      src={this.state.preview}
                      className='imagePreview'
                      alt=''
                    />
                  </div>
                  <div className='gameTitle'>{this.handleTitlePreview()}</div>

                  <div className='bottomSection'>
                    <div className='gamePrice'>
                      {this.handlePricePreview()}&nbsp;
                      <Rendercurrency />
                    </div>
                    {this.state.ownage === 'false' ? (
                      <div className='ownagePreviewFalse'>
                        {this.state.ownagePreviewFalse}
                      </div>
                    ) : (
                      <div className='ownagePreviewOk'>
                        {this.state.ownagePreviewOk}
                      </div>
                    )}
                  </div>
                </div>
                <br />
                <label className='label'>
                  Image:
                  <br />
                  <input
                    id='image'
                    type='file'
                    name='file'
                    onChange={this.handleChange.bind(this)}
                  />
                </label>
                <br />
                <br />
                <div style={{ display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'space-between'}}>
                <label className='label'>
                  Region:
                  <br />
                  <select
                    list='regionlist'
                    name='region'
                    id='region'
                    style={{ width: "80px" }}
                    className='currencydropdown'
                    value={this.state.region}
                    onChange={this.handleChange.bind(this)}
                    required
                  >
                    <option>PAL</option>
                    <option>NTSC</option>
                    <option>NTSC-J</option>
                    <option>NTSC-C</option>
                  </select>
                </label>
                <label className='label'>
                  Released:
                  <br />
                  <input
                    className='form-group-addgame'
                    style={{width: "80px"}}
                    onChange={this.handleChange.bind(this)}
                    id='released'
                    value={this.state.released}
                    type='text'
                    required
                  />
                </label>
                </div>
                <br />
                <br />
              </div>

              <div className='inputForm'>
                <br />
                <br />
                <label className='label'>
                  Title:
                  <br />
                  <input
                    className='form-group-addgame'
                    onChange={this.handleChange.bind(this)}
                    id='title'
                    value={this.state.title}
                    type='text'
                    required
                  />
                </label>
                <br />
                <label className='label'>
                  Platform:
                  <br />
                  <input
                    className='form-group-addgame'
                    onChange={this.handleChange.bind(this)}
                    id='platform'
                    value={this.state.platform}
                    type='text'
                    required
                  />
                </label>
                <br />
                <label className='label'>
                  Price:
                  <br />
                  <input
                    className='form-group-addgame'
                    onChange={this.handleChange.bind(this)}
                    id='price'
                    value={this.state.price}
                    type='text'
                    required
                  />
                </label>
                <br />
                <label className='label'>
                  Rating:
                  <br />
                  <div
                    className='star-rating'
                    onChange={this.handleChange.bind(this)}
                  >
                    <input type='radio' id='5-stars' name='rating' value='5' />
                    <label htmlFor='5-stars' className='star'>
                      &#9733;
                    </label>
                    <input type='radio' id='4-stars' name='rating' value='4' />
                    <label htmlFor='4-stars' className='star'>
                      &#9733;
                    </label>
                    <input type='radio' id='3-stars' name='rating' value='3' />
                    <label htmlFor='3-stars' className='star'>
                      &#9733;
                    </label>
                    <input type='radio' id='2-stars' name='rating' value='2' />
                    <label htmlFor='2-stars' className='star'>
                      &#9733;
                    </label>
                    <input type='radio' id='1-star' name='rating' value='1' />
                    <label htmlFor='1-star' className='star'>
                      &#9733;
                    </label>
                  </div>
                </label>
                <br />
                <fieldset id='ownagefieldset' style={{ display: "flex", 
                                                       flexDirection: "row", 
                                                       justifyContent: "space-between"}}>
                  <legend>I own:</legend>
                  <label className='label' style={{ display: "flex", flexDirection: "column"}}>
                    Module
                    <input
                      onChange={this.handleChange.bind(this)}
                      id='ownage'
                      value={this.state.ownage}
                      type='checkbox'
                    />
                  </label>
                  <label className='label' style={{ display: "flex", flexDirection: "column"}}>
                    Box
                    <input
                      onChange={this.handleChange.bind(this)}
                      id='box'
                      value={this.state.box}
                      type='checkbox'
                    />
                  </label>
                  <label className='label' style={{ display: "flex", flexDirection: "column"}}>
                    Manual
                    <input
                      onChange={this.handleChange.bind(this)}
                      id='manual'
                      value={this.state.manual}
                      type='checkbox'
                    />
                  </label>
                </fieldset>
              </div>
            </div>
            <div className='bottomContainer'>
              <label className='label'>
                Description:
                <br />
                <textarea
                  className='form-group-textarea'
                  onChange={this.handleChange.bind(this)}
                  id='description'
                  value={this.state.description}
                  type='text'
                  rows='4'
                  required
                />
              </label>
              <br />
              <br />
            </div>
            <button className='addGameButton'>Add Game</button>
          </div>
        </form>
      </div>
    )
  }

  handleChange(event) {
    const field = event.target.id
    var checkBox = document.getElementById('ownage')
    var checkBoxManual = document.getElementById('manual')
    var checkBoxBox = document.getElementById('box')

    if (field === 'title') {
      this.setState({ title: event.target.value })
    } else if (field === 'price') {
      this.setState({ price: event.target.value })
    } else if (field === 'region') {
      this.setState({ region: event.target.value })
    } else if (field === 'released') {
      this.setState({ released: event.target.value })
    } else if (field === 'description') {
      this.setState({ description: event.target.value })
    } else if (field === '1-star') {
      this.setState({ stars: event.target.value })
    } else if (field === '2-stars') {
      this.setState({ stars: event.target.value })
    } else if (field === '3-stars') {
      this.setState({ stars: event.target.value })
    } else if (field === '4-stars') {
      this.setState({ stars: event.target.value })
    } else if (field === '5-stars') {
      this.setState({ stars: event.target.value })
    } else if (field === 'platform') {
      this.setState({ platform: event.target.value })
    } else if (field === 'image') {
      this.setState({
        preview: URL.createObjectURL(event.target.files[0]),
        file: event.target.files[0],
      })
    } 
    
    if (checkBoxBox.checked === true) {
      this.setState({ box: 'true' })
    } else  { this.setState({ box: 'false' }) }  
    
    if (checkBoxManual.checked === true) {
      this.setState({ manual: 'true' })
    } else { this.setState({ manual: 'false' }) } 
    
    if (checkBox.checked === true) {
      this.setState({ ownage: 'true', ownagePreviewOk: <>&#10004;</> })
      this.handleShowSuccess()
    } else  {
      this.setState({ ownage: 'false', ownagePreviewFalse: <>&#x2715;</> })
      this.handleShow()
    }
  }
  handleSubmit(event) {
    event.preventDefault()
    let data = new FormData()
    data.append('title', this.state.title)
    data.append('price', this.state.price)
    data.append('platform', this.state.platform)
    data.append('ownage', this.state.ownage)
    data.append('region', this.state.region)
    data.append('released', this.state.released)
    data.append('description', this.state.description)
    data.append('file', this.state.file)
    data.append('stars', this.state.stars)
    data.append('box', this.state.box)
    data.append('manual', this.state.manual)
    data.append('iswishlist', 'false')

    axios({
      method: 'POST',
      withCredentials: true,
      credentials: 'include',
      url: `${API_ENDPOINT}/api/newgame`,
      headers: { 'Content-Type': 'multipart/form-data' },
      data: data,
    }).then((response, props) => {
      console.log(response)
      if (response.data.success) {
        this.setState({
          title: '',
          preview: ImagePlaceholder,
          price: '',
          platform: '',
          description: '',
          file: '',
        })
        console.log('Successfully added game!')
      }
    })
  }
}

export default AddGame
