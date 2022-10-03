process.env["NTBA_FIX_319"] = 1;
const bot = require('../bot')
const fetch = require("node-fetch")

require('dotenv').config()

const wishlist_command = function wishlist_command() {

    const uri = process.env.BACKEND_URL

    bot.command('wishlist', (ctx) =>
        fetch(uri + '/api/public/wishlist').then((res) =>
            res.json()).then(json => json.map(game =>
                ctx.reply(`${game.title}\r\n${game.platform}`))
            )
    )

}

module.exports = wishlist_command