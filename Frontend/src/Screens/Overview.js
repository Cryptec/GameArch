import React, { Component } from 'react'
import RenderDetailView from '../utils/renderDetailView'
import RenderListView from '../utils/renderListView'
import { GridIcon, ListIcon } from '../assets/icons/index.jsx'

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
          <div className="girdViewButton"><GridIcon/></div>
          <div className="listViewButton"><ListIcon/></div>
        </div>

        <RenderDetailView />
        <RenderListView />
        </div>
      </div>
    )
}

}

export default Overview
