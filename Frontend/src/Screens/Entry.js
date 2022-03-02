import React from 'react'
import Search from '../components/Search/Search'
import HomeWishlist from './HomeSections/HomeWishlist'
import LastAdded from './HomeSections/LastAdded'
import Stats from './HomeSections/Stats'


function Entry() {
  return (
      <div id="contentpage">
        <Stats />
      <div className="overviewContainer">
      <div style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column'}}>
        <Search />
        <LastAdded />
        <HomeWishlist />
      </div>
      </div>
      </div>

  )
}


export default Entry