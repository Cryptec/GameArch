import React from 'react'
import LastAdded from './HomeSections/LastAdded'


function Entry() {
  return (

      <div id="contentpage">
        <div className="overviewContainer">
          <h3 style={{ color: 'var(--text-primary)' }}>Home</h3>
        </div>
        <LastAdded />
      </div>

  )
}


export default Entry