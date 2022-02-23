import React, { Component } from 'react'
import Rendercurrency from '../../utils/renderCurrency'

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:5000'

class Stats extends Component {
    constructor(props) {
        super(props)
        this.state = {
            gamecount: [],
            valuecount: [],
            fetchgamecount: "",
            fetchvaluecount: ""
        }
    }

    componentDidMount() {
        this.FetchGameCount()
        this.FetchValueCount()
    }

    async FetchGameCount() {
        
        const response = await fetch(`${API_ENDPOINT}/api/gamecount`, {credentials: 'include'})
        if (response.ok) {
            const gamecount = await response.json()
            this.setState({ gamecount })
            return gamecount.length > 0
                ? (this.state.gamecount.map(counter => {
                  return this.setState({ fetchgamecount: `${counter.total}`})
                })
                ) : (
                  console.log("error fetching total game count")
                )
        } else {
            console.log('error fetching gamecount')
        }
    }

    async FetchValueCount() {

        const response = await fetch(`${API_ENDPOINT}/api/totalvalue`, { credentials: 'include' })
        if (response.ok) {
            const valuecount = await response.json()
            this.setState({ valuecount })
            return valuecount.length > 0
                ? (this.state.valuecount.map(values => {
                    return this.setState({ fetchvaluecount: `${values.price}` })
                })
                ) : (
                    console.log("error fetching total value count")
                )
        } else {
            console.log('error fetching valuecount')
        }
    }

    renderGameCount = () => {
        
        return (
            <div style={{padding: '20px', width: '100%'}}>
            <div style={styles.topSubContainer}>
                    <div>Games owned<br />total:</div>
            </div>
            <div style={styles.bottomSubContainer}>{this.state.fetchgamecount}</div>
            </div>
        )
    }

          

    renderValueCount = () => {

        const data = this.state.valuecount
        const sumPrices = data.reduce((sum, ele) => {
            if(typeof(ele.price) === "string") return sum + parseInt(ele.price)
            else return sum + ele.price
          }, 0);

        return (
            <div style={{ padding: '20px', width: '100%' }}>
                <div style={styles.topSubContainer}>
                    <div>Total games<br />value:</div>
                </div>
                <div style={styles.bottomSubContainer}>{sumPrices} <Rendercurrency /></div>
            </div>
        )
    }

render() {

    return (
   
        <div className="overviewContainer" style={{marginBottom: '5px', justifyContent: 'space-between'}}>
            <div style={styles.subcontainer}>{this.renderValueCount()}</div>
            <div style={styles.subcontainer}>{this.renderGameCount()}</div>
            <div style={styles.subcontainer}>3</div>
            <div style={styles.subcontainer}>4</div>
        </div>
    )
}

}
const styles = {};

styles.subcontainer = {
    width: '24%',
    height: '140px',
    display: 'flex',
    backgroundColor: 'var(--secondary)',
    borderRadius: '5px',
    color: '#B9BCC3',
    minWidth: '200px'
}
styles.topSubContainer = {
    borderBottom: '1.5px solid #B9BCC3',
    width: '100%',
    height: '60px',
    display: 'flex',
    fontSize: '19px'
}
styles.bottomSubContainer = {
    paddingTop: '20px',
    fontSize: '21px',
    color: 'white',
    display: 'flex',
    flexDirection: 'row'
    
}
export default Stats