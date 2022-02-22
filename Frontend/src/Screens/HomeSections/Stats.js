import React, { Component } from 'react'
import axios from 'axios'

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

render() {

    return (
   
        <div className="overviewContainer" style={{marginBottom: '5px', justifyContent: 'space-between'}}>
            <div style={styles.subcontainer}>1</div>
            <div style={styles.subcontainer}>{this.state.fetchgamecount}</div>
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
    borderRadius: '7px',
    color: 'var(--text-primary)'
}

export default Stats