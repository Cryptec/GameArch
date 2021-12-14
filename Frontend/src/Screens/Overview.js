import React, { Component } from 'react'
import RenderDetailView from '../utils/renderDetailView'
import RenderListView from '../utils/renderListView'
import axios from 'axios'
import { GridIcon, ListIcon } from '../assets/icons/index.jsx'

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

class Overview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      settings: [],
      isActiveList: false,
      isActiveGrid: true,
      view: ""
      
    }
}

async componentDidMount() {
  const response = await fetch(`${API_ENDPOINT}/api/settingsdata`, {credentials: 'include'})
  if (response.ok) {
    const settings = await response.json()
    this.setState({ settings })
    this.state.settings.map(setting => {
      this.setState({view: setting.listview})
      if (this.state.view === false) {
        return this.setState({ isActiveList: false, isActiveGrid: true })
      } else if (this.state.view === true) {
         return this.setState({ isActiveList: true, isActiveGrid: false })
      }
    })
  } else {
    console.log("error")
  }
}

handleShowList = () =>{
  axios({
    method: "POST",
    withCredentials: true,
    credentials: 'include',
    url: `${API_ENDPOINT}/api/setview`,
    headers: { 'Content-Type': 'application/json' },
    data: { view: "true", id: 1 }
});
}
handleShowGrid = () =>{
  axios({
    method: "POST",
    withCredentials: true,
    credentials: 'include',
    url: `${API_ENDPOINT}/api/setview`,
    headers: { 'Content-Type': 'application/json' },
    data: { view: "false", id: 1 }
});
}

handleDisplayType = () => {
  return this.state.settings.map(setting => {
    if (setting.listview === 'true') {
      return <RenderListView />
    } else if (setting.listview === 'false') {
        return <RenderDetailView />
    } 
    return (setting.listview)

  })
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
