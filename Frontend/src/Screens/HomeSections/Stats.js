import React, { Component } from 'react'


class Stats extends Component {

    render() {

    return (

        <div className="overviewContainer" style={{marginBottom: '5px', justifyContent: 'space-between'}}>
            <div style={styles.subcontainer}>1</div>
            <div style={styles.subcontainer}>2</div>
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
    backgroundColor: 'blue'
}

export default Stats