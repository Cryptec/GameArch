import React, { Component } from 'react'
import axios from 'axios'
import ImagePlaceholder from '../assets/imageplaceholder.png'
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
        file: null
    };
}

componentDidMount = () => {
     this.setState({file: ImagePlaceholder})
}

  render() {

    return (
      <div>
     
        <div id="contentpage">
        <div className="contentContainerInputForm">
        <div className="gamesPreview">
                 <img src={this.state.file} className="imagePreview" alt=""/>
                 <text className="gameTitle">{this.state.title}</text>
                 <text className="gameTitle">{this.state.price}</text>
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
                    className="form-group-login"
                    onChange={this.handleChange.bind(this)}
                    id="ownage"
                    value={this.state.ownage}
                    type='checkbox'
                  />
                 </label>
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
      this.setState({ ownage: "true" });
    } else {
      this.setState({ ownage: "false" });
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