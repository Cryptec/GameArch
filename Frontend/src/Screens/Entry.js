import React from 'react'
import HomeWishlist from './HomeSections/HomeWishlist'
import LastAdded from './HomeSections/LastAdded'
import Stats from './HomeSections/Stats'


function Entry() {
  return (
      <div id="contentpage">
        <Stats />
      <div className="overviewContainer">
      <div style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column'}}>
        <LastAdded />
        <HomeWishlist />
      </div>
      </div>
      </div>

  )
}


export default Entry