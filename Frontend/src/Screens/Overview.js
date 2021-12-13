import React, { Component } from 'react'
import RenderDetailView from '../utils/renderDetailView'

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

class Overview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      games: [],
      
    }
}

  render() {

    return (
      <div>
    
        <div id="contentpage">

        <div className="overviewContainer" style={{marginBottom: "5px"}}>
          toggleList
        </div>

        <RenderDetailView />
        </div>
      </div>
    )
}

}

export default Overview
