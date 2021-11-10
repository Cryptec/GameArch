import React from 'react'
import { Link } from 'react-router-dom'

function Overview() {

    return (
      <div>
    
        <div id="contentpage">
        <div className="overviewContainer">
           
           <Link to='/addgame' className="addGamesButton">add games</Link>

        </div>
        </div>
      </div>
    )
}

export default Overview