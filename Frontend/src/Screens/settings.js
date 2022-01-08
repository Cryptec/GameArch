import React, { Component } from 'react'
import '../css/settings.css'
import GeneralSettings from './Settings/generalSettings';
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
          <div className="overviewContainer" style={{ color: 'var(--text-primary)' }}>
            version: 0.6.0
         </div>
      </div>
      </div>
    )
  }
}


export default Settings