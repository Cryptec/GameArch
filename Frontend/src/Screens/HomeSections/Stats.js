import React, { Component } from 'react'

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:5000'

class Stats extends Component {
    constructor(props) {
        super(props)
        this.state = {
            gamecount: [],
            fetchgamecount: ""
        }
    }

    componentDidMount() {
        this.FetchGameCount()
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

    renderGameCount = () => {
        return (
            <div style={{padding: '20px', width: '100%'}}>
            <div style={styles.topSubContainer}>
            <p>Total:</p>
            </div>
            <div style={{paddingTop: '20px'}}>{this.state.fetchgamecount}</div>
            </div>
        )
    }

render() {

    return (
   
        <div className="overviewContainer" style={{marginBottom: '5px', justifyContent: 'space-between'}}>
            <div style={styles.subcontainer}>1</div>
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
    color: 'white',
}
styles.topSubContainer = {
    borderBottom: '2px solid white',
    width: '100%',
    display: 'flex'
}
export default Stats