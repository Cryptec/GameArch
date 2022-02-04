import React, { Component } from 'react'
import '../css/settings.css'
import GeneralSettings from './Settings/generalSettings';
import SystemSettings from './Settings/systemSettings';
import UserSettings from './Settings/userSettings';


class Settings extends Component {
  constructor() {
    super();
    this.state = {

    };
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