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
      isActiveList: false,
      isActiveGrid: true,
      
    }
}

handleShowList = () =>{
  this.setState({ isActiveList: true, isActiveGrid: false })
}

handleShowGrid = () =>{
  this.setState({ isActiveList: false, isActiveGrid: true })
}

handleDisplayType = () => {
  if (this.state.isActiveList === true) {
    return <RenderListView />
  } else if (this.state.isActiveGrid === true) {
    return <RenderDetailView />
  }
}
  render() {

    return (
      <div>
    
        <div id="contentpage">

        <div className="overviewContainer" style={{marginBottom: "5px"}}>
          <div className="girdViewButton" onClick={this.handleShowGrid}><GridIcon/></div>
          <div className="listViewButton" onClick={this.handleShowList}><ListIcon/></div>
        </div>

        {this.handleDisplayType()}
        </div>
      </div>
    )
}

}

export default Overview
