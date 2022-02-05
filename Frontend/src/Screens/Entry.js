import React from 'react'
import HomeWishlist from './HomeSections/HomeWishlist'
import LastAdded from './HomeSections/LastAdded'


function Entry() {
  return (

      <div id="contentpage">
      <div className="overviewContainer">
        <LastAdded />
        <HomeWishlist />
      </div>
      </div>

  )
}


export default Entry