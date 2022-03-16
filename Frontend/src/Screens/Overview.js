import React, { Component } from 'react'
import RenderDetailView from '../utils/renderDetailView'
import RenderListView from '../utils/renderListView'
import axios from 'axios'
import { GridIcon, ListIcon } from '../assets/icons/index.jsx'
import platforms from '../utils/platforms'
import RenderPlatformValue from '../utils/RenderPlatformValue'

const API_ENDPOINT = window._env_.REACT_APP_API_ENDPOINT

class Overview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      settings: [],
      platform: "all games",
      view: "",
      count: 0,
      isActiveList: "false",
      inputText: ''   
    }
}

async componentDidMount() {
  this.FetchView()
  this.getPlatforms()
}

async FetchView() {
  const response = await fetch(`${API_ENDPOINT}/api/settingsdata`, {credentials: 'include'})
  if (response.ok) {
    const settings = await response.json()
    this.setState({ settings })
    this.state.settings.map(setting => {
    this.setState({isActiveList: setting.listview})
    this.handleDisplayType()
    return(true)
    })
  } else {
    console.log("error")
  }
}

handleSetList = () =>{
  axios({
    method: "POST",
    withCredentials: true,
    credentials: 'include',
    url: `${API_ENDPOINT}/api/setview`,
    headers: { 'Content-Type': 'application/json' },
    data: { view: "true", id: 1 }
    });
  this.setState({ isActiveList: "true" })
}
handleSetGrid = () =>{
  axios({
    method: "POST",
    withCredentials: true,
    credentials: 'include',
    url: `${API_ENDPOINT}/api/setview`,
    headers: { 'Content-Type': 'application/json' },
    data: { view: "false", id: 1 }
    });
  this.setState({ isActiveList: "false" })
}

handleDisplayType = () => {
  if (this.state.isActiveList === "true") {
    return <RenderListView input={this.state.inputText} key={this.state.count} />
  } else if (this.state.isActiveList === "false") {
    return <RenderDetailView input={this.state.inputText} key={this.state.count} />
  }
}

  getPlatforms = () => {
    var select = document.getElementById('platform'); 
    var options = platforms; 
    
    for(var i = 0; i < options.length; i++) {
      var opt = options[i];
  
      var el = document.createElement("option");
      el.text = opt;
      el.value = opt;
  
      select.add(el);
    }}
  
    inputHandler = (e) => {
        //convert input text to lower case
        var lowerCase = e.target.value.toLowerCase();
        this.setState({ inputText: lowerCase});
    };
  

  render() {

    return (
    
        <div id="contentpage">
          <div className="overviewContainer" style={{ marginBottom: "10px"}}>
            
          <select
            list='platformlist'
            name='platform'
            id='platform'
            className='filterdropdown'
            value={localStorage.getItem('filter')}
            onChange={this.handleChange.bind(this)}
            required
          >
            <option>all games</option>
          </select>
          <RenderPlatformValue key={this.state.count}/>
    
                <input
                    onChange={this.inputHandler}
                    id='search'
                    placeholder="&#x1F50E;&#xFE0E;"
                />
        
            <div className="girdViewButton" onClick={this.handleSetGrid}><GridIcon/></div>
            <div className="listViewButton" onClick={this.handleSetList}><ListIcon/></div>
          </div>

        {this.handleDisplayType()}
        </div>
    )
}

  handleChange(event) {
    const field = event.target.id

    if (field === 'platform') {
      
      if (event.target.value === 'all games') {
        this.setState({ platform: event.target.value, count: this.state.count + 1 })
        localStorage.setItem('filter', '')
      } else {
        this.setState({ platform: event.target.value, count: this.state.count + 1 })
        localStorage.setItem('filter', event.target.value);
      }
    }
  }


}

export default Overview
