import React, { Component } from 'react'
import { openNav, closeNav } from '../components/handler'
import '../css/settings.css'
import GeneralSettings from './Settings/generalSettings';
import SystemSettings from './Settings/systemSettings';
import UserSettings from './Settings/userSettings';


class Settings extends Component {
  constructor() {
    super();
    this.state = {
      sidebarState: localStorage.getItem('sidebar-collapsed')
    };
  }

async componentDidMount() {
    this.state.sidebarState !== null ? closeNav() : openNav()
}
 
render() {

    return (
      <div>
    
        <div id="contentpage">
          
          <GeneralSettings />
          <br />
          <UserSettings />
          <br />
          <SystemSettings />
      </div>
      </div>
    )
  }
}


export default Settings