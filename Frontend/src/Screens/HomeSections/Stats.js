import React, { Component } from 'react'
import Rendercurrency from '../../utils/renderCurrency'

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:5000'

class Stats extends Component {
    constructor(props) {
        super(props)
        this.state = {
            gamecount: [],
            valuecount: [{'price': '0'}],
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

    add = (l, r, sep) => {
        if (!sep) sep = '.';
        const [ll, lr] = l.split(/[,.]/).map(el => el.split('').map(Number));
        const [rl, rr] = r.split(/[,.]/).map(el => el.split('').map(Number));
        let carry = 0;
        const result = [[], []];
        for (let i = Math.max(lr?.length ?? 0, rr?.length ?? 0); i > 0; --i) {
            result[1][i - 1] = (lr?.[i - 1] ?? 0) + (rr?.[i - 1] ?? 0) + carry;
            carry = Math.floor(result[1][i - 1] / 10);
            result[1][i - 1] %= 10;
        }

        for (let il = ll.length, ir = rl.length, iResult = Math.max(ll.length, rl.length); iResult > 0; --il, --ir, --iResult) {
            result[0][iResult - 1] = (ll[il - 1] ?? 0) + (rl[ir - 1] ?? 0) + carry;
            carry = Math.floor(result[0][iResult - 1] / 10);
            result[0][iResult - 1] %= 10;
        }
        if (carry) result[0] = [carry, ...result[0]];
        return result[0].join('') + sep + result[1].join('');
    }

    sum = (arr, sep) => {
        return arr.map(el => String(el.price)).reduce((acc, el) => this.add(acc, el, sep));
    }

          

    renderValueCount = () => {
        const test = this.state.valuecount
        let testvalue = [{ "price": "5,9" }, { "price": "2,3" }] 
        let sumval = this.sum(test, ',')
        return (
            <div style={{ padding: '20px', width: '100%' }}>
                <div style={styles.topSubContainer}>
                    <div>Total games<br />value:</div>
                </div>
                <div style={styles.bottomSubContainer}>{sumval} <Rendercurrency /></div>
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