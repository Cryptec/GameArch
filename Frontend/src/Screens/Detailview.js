import React from 'react'
import '../css/detailview.css'
import { useLocation, Link } from "react-router-dom"
import Rendercurrency from '../utils/renderCurrency'

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'http://localhost/api/'

let deleteTableRow = async (id) => {

  await fetch(`${API_ENDPOINT}/api/game/${id}`, { credentials: 'include', method: 'DELETE' })
  const response = await fetch(`${API_ENDPOINT}/api/gamedata`, { credentials: 'include' })
  if (response.ok) {
    await response.json()
    return window.location.replace("/overview");
  } else {
    return console.error();
  }
}

function Detailview(props) {

  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
  const location = useLocation()
  const gameTitle = location.state?.titlename
  const currency = <Rendercurrency />
  const url = `${API_ENDPOINT}/uploads/${location.filename}`
  const id = location.id

  return (
    
    <>

      {gameTitle ? (
        <div id="contentpage">
          <div className="pageContainer">

           <div className="HeaderContainer">
              <div className="imageWrapperDetail">
                <img src={`${url}`} alt="" className="imagePreviewDetail" />
              </div>
              <div style={{flexDirection: "column"}}>
              <h1 style={{ color: 'var(--text-primary)', marginLeft: '45px' }}>{location.state.titlename}</h1>
              <h4 style={{ color: 'var(--text-primary)', marginLeft: '45px', marginTop: '-12px' }}>{location.platform}</h4>
              </div>
            </div>
            <br /><br />
              <div className="descriptionContainer">
                <div style={{ color: 'var(--text-primary)' }}>{location.description}</div>
              </div>
            <br />
            <div className="BodyContainer" style={{ color: 'var(--text-primary)', flexDirection: 'column' }}>
              <div>{location.region}</div>
              <div className="gamePriceDetail">{location.price}&nbsp;{currency}</div>
            </div>


          </div>
          <div className="overviewContainer" style={{ marginTop: "5px" }}>
            <Link className="GameEditButton" to={{
              pathname: `/editgame`,
              description: location.description,
              title: location.state.titlename,
              platform: location.platform,
              price: location.price,
              region: location.region,
              ownage: location.ownage,
              id: location.id,
            }} >
            <div type="button">Edit</div>
            </Link>
            <button onClick={() => deleteTableRow(id)} className="GameDeleteButton">Delete</button>
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