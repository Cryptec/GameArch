import React, { Component } from 'react'
import axios from 'axios'
import ImagePlaceholder from '../assets/imageplaceholder.png'
import Rendercurrency from '../utils/renderCurrency'
import '../css/overview.css'
import '../css/addnew.css'

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'http://localhost/api/'

class AddGame extends Component {
  constructor() {
    super();
    this.state = {
        title: "",
        platform: "", 
        price: "",
        ownage: "",
        region: "",
        description: "",
        ownageTrue: "",
        ownageFalse: "",
        ownagePreviewOk: "",
        ownagePreviewFalse: "",
        file: "null",
        preview: null,
        isActive: false
    };
}

componentDidMount = () => {
     this.setState({preview: ImagePlaceholder, 
                    ownage: "false", 
                    region: "PAL",
                    ownageFalse: "I don´t own this Game",
                    ownagePreviewFalse: <>&#x2715;</> })
     this.handleShow()
}
handleShow = () =>{
  this.setState({
      isActive: true
  })
}
handleShowSuccess = () =>{
  this.setState({
      isActive: false
  })
}
handleTitlePreview = () => {
  if (this.state.title === "") {
    return("Game Title")
  } else if (this.state.title) {
    return this.state.title
  }
}
handlePricePreview = () => {
  if (this.state.price === "") {
    return("0,00")
  } else if (this.state.price) {
    return this.state.price
  }
}
removeImage = () => {
  document.getElementById("image").value = null;
  this.setState({ preview: ImagePlaceholder, file: "null" })
}

  render() {

    return (

     
        <div id="contentpage">
           
            <form onSubmit={this.handleSubmit.bind(this)} method="POST" encType='multipart/form-data'>

          <div className="contentContainerInputForm">
            <div className="inputForm">
                 <div className="gamesPreview">

                  <div type="button" className="imgDelButton" onClick={() => this.removeImage()}>&#x2715;</div>

                     <div className="imageWrapper" style={{marginTop: '-25px'}}>
                      <img src={this.state.preview} className="imagePreview" alt=""/>
                     </div>
                      <div className="gameTitle">{this.handleTitlePreview()}</div>
                     <div className="bottomSection">
                      <div className="gamePrice">{this.handlePricePreview()}&nbsp;<Rendercurrency /></div>
                       {this.state.isActive ? <div className="ownagePreviewFalse">{this.state.ownagePreviewFalse}</div> :
                      <div className="ownagePreviewOk">{this.state.ownagePreviewOk}</div>}
                 </div>
             </div>
              <br />
              <label className='label' >
                Region:
                <br />
                    <select
                  list="regionlist"
                  name="region"
                  id="region"
                  className="currencydropdown"
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
              <br />
              <br />
              <label className="label">
                Description:
                 <br />
                <textarea
                  className="form-group-addgame"
                  onChange={this.handleChange.bind(this)}
                  id="description"
                  value={this.state.description}
                  type='text'
                  rows='4'
                  required

                />
              </label>
        </div>

        
        <div className="inputForm">

                 <label className="label">
                 Title: 
                 <br />
                  <input
                    className="form-group-addgame"
                    onChange={this.handleChange.bind(this)}
                    id="title"
                    value={this.state.title}
                    type='text'
                    required

                  />
                 </label>
                 <br />
                 <label className="label">
                 Platform: 
                 <br />
                  <input
                    className="form-group-addgame"
                    onChange={this.handleChange.bind(this)}
                    id="platform"
                    value={this.state.platform}
                    type='text'
                    required

                  />
                 </label>
                 <br />
                 <label className="label">
                 Price: 
                 <br />
                  <input
                    className="form-group-addgame"
                    onChange={this.handleChange.bind(this)}
                    id="price"
                    value={this.state.price}
                    type='text'
                    required

                  />
                 </label>
                 <br />
                 <label className="label">
                 Own: 
                 <br />
                  <input
                    onChange={this.handleChange.bind(this)}
                    id="ownage"
                    value={this.state.ownage}
                    type='checkbox'
                  />
                 </label>

                 {this.state.isActive ? <div className="errorTextAddGame">{this.state.ownageFalse}</div> : <div className="successTextAddGame">{this.state.ownageTrue}</div>}


                 <br />
                 <label className="label">
                 Image: 
                 <br />
                  <input
                  id="image"
                  type="file"
                  name="file"
                  onChange={this.handleChange.bind(this)}
                  />
                 </label>

                 <br />
                 <br />
                 <button className="addButton">
                    Add Game
                 </button>

            </div>
          </div>
          </form>
        </div>
    )
  }
  
handleChange(event) {
    const field = event.target.id;
    var checkBox = document.getElementById("ownage");

    if (field === "title") {
        this.setState({ title: event.target.value });
    } else if (field === "price") {
      this.setState({ price: event.target.value });
    } else if (field === "region") {
      this.setState({ region: event.target.value });
    } else if (field === "description") {
      this.setState({ description: event.target.value });
    } else if (field === "platform") {
      this.setState({ platform: event.target.value });
    } else if (field === "image") {
      this.setState({ preview: URL.createObjectURL(event.target.files[0]), file: event.target.files[0] })
    } else if (checkBox.checked === true){
      this.setState({ ownage: "true", ownageTrue: "I own this Game", ownagePreviewOk: <>&#10004;</> });
      this.handleShowSuccess()
    } else {
      this.setState({ ownage: "false", ownageFalse: "I don´t own this Game", ownagePreviewFalse: <>&#x2715;</> });
      this.handleShow()
    }
}
handleSubmit(event) {
  event.preventDefault();
  let data = new FormData();
  data.append('title', this.state.title);
  data.append('price', this.state.price);
  data.append('platform', this.state.platform);
  data.append('ownage', this.state.ownage);
  data.append('region', this.state.region);
  data.append('description', this.state.description);
  data.append('file', this.state.file);

  axios({
      method: "POST",
      withCredentials: true,
      credentials: 'include',
      url: `${API_ENDPOINT}/api/newgame`,
      headers: { 'Content-Type': 'multipart/form-data' },
      data: data
      
  }).then((response, props) => {
      console.log(response)
      if (response.data.success) {
          this.setState({ title: "", preview: ImagePlaceholder, price: "", platform: "", description: "" })
          console.log("Successfully added");
      } 
  });
}}

export default AddGame