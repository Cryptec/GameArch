import React, { Component } from 'react'
import axios from 'axios'

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

  render() {

    return (
      <div>
     
        <div id="contentpage">
        <div className="contentContainer">
           
           <h3>Add a Game</h3>

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

                 <div className="games">
                 <img src={this.state.file} width="190" height="auto"/>
                 <text>{this.state.title}</text>
                 </div>

                 <br />
                 <button>
                    Add Game
                 </button>

            </form>
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
      data: { title: this.state.title}
      
  }).then((response, props) => {
      console.log(response)
      if (response.data.success) {
          this.setState({ title: "" })
          console.log("Successfully added");
      } 
  });
}}

export default AddGame