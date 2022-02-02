import React from 'react'
import LastAdded from './HomeSections/LastAdded'
import {  userName } from '../utils'


function Entry() {
  return (

      <div id="contentpage">
        <div className="overviewContainer">
          <h3 style={{ color: 'var(--text-primary)', marginLeft: '8px' }}>Welcome, {userName()} </h3>
        </div>
        <br/>
        <LastAdded />
      </div>

  )
}


export default Entry