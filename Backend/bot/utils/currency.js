const fetch = require("node-fetch")

require('dotenv').config()

const uri = process.env.BACKEND_URL

const getcurrency = () => {
    let fetchCurrency = fetch(uri + '/api/public/currency').then((res) =>
        res.json()).then(json => json.map(game => {

            if (game.currency === 'EUR') {
                return('€')
            } else if (game.currency === 'USD') {
                return('$')
            } else if (game.currency === 'BTC') {
                return('₿')
            } else {
                return 'failed getting currency'
            }
        }))
    return fetchCurrency
}

exports.getcurrency = getcurrency