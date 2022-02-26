import React, { Component } from 'react'
import Rendercurrency from '../utils/renderCurrency'

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:5000'

class RenderPlatformValue extends Component {

    constructor(props) {
        super(props)
        this.state = {
            values: [{ 'price': '0' }],
            isLoading: false,
            isError: false,
            filter: localStorage.getItem('filter'),
        }
    }

    async componentDidMount() {
        this.setState({ isLoading: true })
        const response = await fetch(`${API_ENDPOINT}/api/totalvalue/${this.state.filter}`, { credentials: 'include' })
        if (response.ok) {
            const values = await response.json()
            return values.length > 0
                ? (this.setState({ values })
                ) : (
                    console.log("error fetching total value count")
                )
        } else {
            this.setState({ isError: true, isLoading: false })
        }
    }

    render() {

        return (
            <div>
               {this.renderPlatformValueCount()}
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



    renderPlatformValueCount = () => {
        const val = this.state.values
        let sumval = this.sum(val, ',')
        return (
            <div style={styles.returnvalue}>
            {sumval}&nbsp;<Rendercurrency />
            </div>
        )
    }
}

const styles = {};

styles.returnvalue = {
    display: 'flex',
    flexDirection: 'row',
    color: 'var(--text-primary)',
    borderRadius: '5px',
    border: 'var(--border)',
    backgroundColor: 'var(--background)',
    padding: '5px',
    marginLeft: '10px',
    fontSize: '14px'
}

export default RenderPlatformValue