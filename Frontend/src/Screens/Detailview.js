import React from 'react'
import '../css/detailview.css'
import { useLocation } from "react-router-dom"



function Detailview(props) {

  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
  const location = useLocation()
  const gameTitle = location.state?.titlename
  const url = `${API_ENDPOINT}/uploads/${location.filename}`

  return (
    <>

      {gameTitle ? (
        <div id="contentpage">
          <div className="pageContainer">

           <div className="HeaderContainer">
              <div className="imageWrapperDetail">
                <img src={`${url}`} alt="" className="imagePreviewDetail" />
              </div>
              <h2 style={{ color: 'var(--text-primary)', marginLeft: '45px' }}>{location.state.titlename}</h2>
              <h4 style={{ color: 'var(--text-primary)', marginLeft: '45px' }}>{location.platform}</h4>
            </div>
            <br /><br />
              <div className="descriptionContainer">
                <div style={{ color: 'var(--text-primary)' }}>{location.description}</div>
              </div>
            <br />
            <div className="BodyContainer">
            <h3 style={{ color: 'var(--text-primary)' }}>{location.price}</h3>
            </div>


          </div>
        </div>
      ) : (
        <div id="contentpage">
          <div className="overviewContainer">
              <h3 style={{ color: 'var(--text-primary)' }}>No Game Selected</h3>
          </div>
        </div>
      )}
    </>
  )
}

export default Detailview