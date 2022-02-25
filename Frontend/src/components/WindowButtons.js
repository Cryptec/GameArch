
import React, { Component } from 'react'

import '../css/WindowButtons.css'
import './MenuHandler'

class WindowButtons extends Component {



render() {
    return (
        <div>
        <div id="ButtonContainer">
        <nav>
          
          <div id="buttons">

              <div id="close">
                 <span id="close-font" >&#10005;</span>
              </div>
              
              <div id="maximize">
                <span id="size-font">&#9723;</span>
              </div>
              
              <div id="minimize">
                <span id="minimize-font">&mdash;</span>
              </div>
                    
          </div>
          
        </nav>
        </div>
        </div>


        );
    }
}

export default WindowButtons;