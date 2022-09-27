process.env["NTBA_FIX_319"] = 1;

require('dotenv').config()
const fetch = require("node-fetch")

const telegram_bot = function telegram_bot() {

const { Telegraf, Markup } = require('telegraf');


const BOT_TOKEN = process.env.BOT_TOKEN
const ORIGIN = process.env.CORS_ORIGIN
const URI = process.env.BACKEND_URL

const bot = new Telegraf(BOT_TOKEN)
let uri = URI;


const keyboard = Markup.inlineKeyboard([
    Markup.button.url('GameArch', `https://neupi.de`)
])

bot.start((ctx) =>
    ctx.reply('Hi! i am your GameArch Bot!' , keyboard))

bot.help((ctx) =>
    ctx.reply('/help - lists all useful commands \r\n/wishlist -show wishlist'))

bot.command('wishlist', (ctx) => 
    fetch(uri + '/api/public/wishlist').then((res) => 
        res.json()).then(json => json.map(game => 
            ctx.reply(`${game.title}\r\n${game.platform}`)) 
        )
)

bot.hears(/^!find|^\/find/i, async (ctx) => { 
    var checkreply = ctx.message.reply_to_message
    if (checkreply === undefined) {
        let getmsg = ctx.message.text
        let checkgame = getmsg.substring(6)
        if (checkgame === '') {
            ctx.reply("Please enter a Game to search!")
            return
        } else {
            var title = getmsg.substring(6)
            fetch(uri + `/api/public/game/${title}`)
                .then(response => {
                    if (response.ok) {
                        response.json().then((data) => {
                            if (data.answer === 'NoGame') {
                                return ctx.reply('Game not Found!')
                            } else if (data.iswishlist === 'true') {
                                return ctx.reply(`The Game is on your Wishlist!\r\n \r\n ${data.title}\r\n${data.price},-`)
                            } else {
                                return ctx.reply(`${data.title}\r\n${data.price},-`)
                            }
                        });
                    } else {
                        throw 'there is something wrong';
                    }
                })
                .catch(error => {
                    ctx.reply(error)
                })    
        }
    } else {
        var title = ctx.message.reply_to_message.text
        if (title !== undefined) {
            fetch(uri + `/api/public/game/${title}`)
                .then(response => {
                    if (response.ok) {
                        response.json().then((data) => {
                            if (data.answer === 'NoGame') {
                                return ctx.reply('Game not Found!')
                            } else if (data.iswishlist === 'true') {
                                return ctx.reply(`The Game is on your Wishlist!\r\n \r\n ${data.title}\r\n${data.price},-`)
                            } else {
                                return ctx.reply(`${data.title}\r\n${data.price} ,-`)
                            }
                        });
                    } else {
                        throw 'there is something wrong';
                    }
                })
                .catch(error => {
                    return ctx.reply(error)
                })
        }
    }
}) 

bot.hears(/^!info|^\/info/i, async (ctx) => { 
    var checkreply = ctx.message.reply_to_message
    if (checkreply === undefined) {
        let getmsg = ctx.message.text
        let checkgame = getmsg.substring(6)
        if (checkgame === '') {
            ctx.reply("Please enter a Game to search!")
            return
        } else {
            var title = getmsg.substring(6)
            fetch(uri + `/api/public/game/${title}`)
                .then(response => {
                    if (response.ok) {
                        response.json().then((data) => {
                            if (data.answer === 'NoGame') {
                                return ctx.reply('Game not Found!')
                            } else {
                                return ctx.reply(`${data.title} (${data.released})\r\n \r\n${data.description}`)
                            }
                        });
                    } else {
                        throw 'there is something wrong';
                    }
                })
                .catch(error => {
                    ctx.reply(error)
                })    
        }
    } else {
        var title = ctx.message.reply_to_message.text
        if (title !== undefined) {
            fetch(uri + `/api/public/game/${title}`)
                .then(response => {
                    if (response.ok) {
                        response.json().then((data) => {
                            if (data.answer === 'NoGame') {
                                return ctx.reply('Game not Found!')
                            } else {
                                return ctx.reply(`${data.title} (${data.released})\r\n \r\n${data.description}`)
                            }
                        });
                    } else {
                        throw 'there is something wrong';
                    }
                })
                .catch(error => {
                    return ctx.reply(error)
                })
        }
    }
}) 

bot.launch()

}

module.exports = telegram_bot