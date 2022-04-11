import React, { Component } from 'react'

const API_ENDPOINT = window._env_.REACT_APP_API_ENDPOINT

class Rendersellprice extends Component {
  constructor(props) {
    super(props)
    this.state = {
        isLoading: true, 
        isError: false,
        sellvalue: [{'saleprice': '0,00'}]
    }
}

componentDidMount = async () => {
    const response = await fetch(`${API_ENDPOINT}/api/totalincome`, { credentials: 'include' })
    if (response.ok) {
        const sellvalue = await response.json()
        return sellvalue.length > 0
            ? (this.setState({ sellvalue })
            ) : (
                console.log("error fetching total value count")
            )
    } else {
        console.log('error fetching sellvalue')
    }
}

  render() {

    return (
        <div>
           {this.renderValueCount()}
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
    return arr.map(el => String(el.saleprice)).reduce((acc, el) => this.add(acc, el, sep));
}

      

renderValueCount = () => {
    const val = this.state.sellvalue
    let sumval = this.sum(val, ',')
    return (
        <>
        {sumval === '' ? '0,00' : sumval}
        </>
    )
}
}


export default Rendersellprice
