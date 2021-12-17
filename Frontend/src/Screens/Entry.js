import React from 'react'
import Themes from '../utils/Themes'


function Entry() {

    return (
      <div>
    
        <div id="contentpage">
          <div className="overviewContainer">
           <h3 style={{color: 'var(--text-primary)'}}>Home</h3>
           <Themes />
          </div>
        </div>
      </div>
    )
  }


export default Entry