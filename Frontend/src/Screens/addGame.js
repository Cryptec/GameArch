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
    if (field === "title") {
        this.setState({ title: event.target.value });
    } else if (field === "image") {
      this.setState({ file: URL.createObjectURL(event.target.files[0]) })
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
      data: { title: this.state.title, file: this.state.file}
      
  }).then((response, props) => {
      console.log(response)
      if (response.data.success) {
          this.setState({ title: "", file: "" })
          console.log("Successfully added");
      } 
  });
}}

export default AddGame