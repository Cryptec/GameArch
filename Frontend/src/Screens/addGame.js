import React, { Component } from 'react'
import axios from 'axios'

import '../css/overview.css'

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'http://localhost/api/'

class AddGame extends Component {
  constructor() {
    super();
    this.state = {
        title: "",
    };
}

  render() {

    return (
      <div>
    
        <div id="contentpage">
        <div className="overviewContainer">
           
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