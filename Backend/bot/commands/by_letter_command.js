process.env["NTBA_FIX_319"] = 1;
const bot = require('../bot')
const fetch = require("node-fetch")

require('dotenv').config()

const by_letter = function by_letter() {

    const uri = process.env.BACKEND_URL

    bot.hears(/^!games|^\/games/i, async (ctx) => {
        var checkreply = ctx.message.reply_to_message
        if (checkreply === undefined) {
            let getmsg = ctx.message.text
            let checkgame = getmsg.substring(7)
            if (checkgame === '') {
                ctx.reply("Please enter a Game to search!")
                return
            } else {
                var letter = getmsg.substring(7)
                fetch(uri + `/api/public/gamelist/${letter}`)
                    .then(response => {
                        if (response.ok) {
                            response.json().then((data) => {
                                data.map(data => {
                                if (data.answer === 'NoGame') {
                                    return ctx.reply('Game not Found!')
                                } else {
                                    return ctx.reply(`${data.title}`)
                                }
                                })
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
            var letter = ctx.message.reply_to_message.text
            if (letter !== undefined) {
                fetch(uri + `/api/public/gamelist/${letter}`)
                    .then(response => {
                        if (response.ok) {
                            response.json().then((data) => {
                                if (data.answer === 'NoGame') {
                                    return ctx.reply('Game not Found!')
                                } else {
                                    return ctx.reply(`${data.title}`)
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

}

module.exports = by_letter