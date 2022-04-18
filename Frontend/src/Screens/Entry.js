import React, { Component } from 'react'
import HomeWishlist from './HomeSections/HomeWishlist'
import LastAdded from './HomeSections/LastAdded'
import Stats from './HomeSections/Stats'
import { openNav, closeNav } from '../components/handler'


class Entry extends Component {
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
}


export default Entry