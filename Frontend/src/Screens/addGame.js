import React, { Component } from 'react'
import axios from 'axios'
import ImagePlaceholder from '../assets/imageplaceholder.png'
import Rendercurrency from '../utils/renderCurrency'
import '../css/overview.css'

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'http://localhost/api/'

class AddGame extends Component {
  constructor() {
    super();
    this.state = {
        title: "",
        platform: "", 
        price: "",
        ownage: "",
        ownageTrue: "",
        ownageFalse: "",
        file: null,
        isActive: false
    };
}

componentDidMount = () => {
     this.setState({file: ImagePlaceholder, 
                    ownage: "false", 
                    ownageFalse: "I don´t own this Game"})
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

  render() {

    return (

      <div>
     
        <div id="contentpage">
        <div className="contentContainerInputForm">
        <div className="gamesPreview">
                 <img src={this.state.file} className="imagePreview" alt=""/>
                 <div className="gameTitle">{this.state.title}</div>
                 <div className="gamePrice">{this.state.price}&nbsp;<Rendercurrency /></div>
        </div>

        <div className="inputForm">

           <form onSubmit={this.handleSubmit.bind(this)} method="POST">

                 <label className="label">
                 Title: 
                 <br />
                  <input
                    className="form-group-login"
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
                    className="form-group-login"
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
                    className="form-group-login"
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

                 {this.state.isActive ? <div className="errorTextLogin">{this.state.ownageFalse}</div> : <div className="successTextLogin">{this.state.ownageTrue}</div>}


                 <br />
                 <label className="label">
                 Image: 
                 <br />
                  <input
                  id="image"
                  type="file"
                  name="file"
                  placerholder="Upload picture"
                  onChange={this.handleChange.bind(this)}
                  />
                 </label>

                 <br />
                 <br />
                 <button className="addButton">
                    Add Game
                 </button>

            </form>
            </div>

        </div>
        </div>
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
    } else if (field === "platform") {
      this.setState({ platform: event.target.value });
    } else if (field === "image") {
      this.setState({ file: URL.createObjectURL(event.target.files[0]) })
    } else if (checkBox.checked === true){
      this.setState({ ownage: "true", ownageTrue: "I own this Game" });
      this.handleShowSuccess()
    } else {
      this.setState({ ownage: "false", ownageFalse: "I don´t own this Game" });
      this.handleShow()
    }
}
handleSubmit(event) {
  event.preventDefault();
  this.setState({ status: "Submit" });

  axios({
      method: "POST",
      withCredentials: true,
      credentials: 'include',
      url: `${API_ENDPOINT}/api/newgame`,
      headers: { 'Content-Type': 'application/json' },
      data: { title: this.state.title,
              price: this.state.price,
              platform: this.state.platform,
              ownage: this.state.ownage, 
              file: this.state.file}
      
  }).then((response, props) => {
      console.log(response)
      if (response.data.success) {
          this.setState({ title: "", file: ImagePlaceholder, price: "", platform: "", ownage: "" })
          console.log("Successfully added");
      } 
  });
}}

export default AddGame