process.env["NTBA_FIX_319"] = 1;
const bot = require('../bot')
const fetch = require("node-fetch")

require('dotenv').config()

const info_command = function info_command() {

    const uri = process.env.BACKEND_URL

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
                                    return ctx.reply(`<b>${data.title}</b> (${data.released})\r\n \r\n${data.description}`, { parse_mode: "HTML" })
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
                                    return ctx.reply(`<b>${data.title}</b> (${data.released})\r\n \r\n${data.description}`, { parse_mode: "HTML" })
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

module.exports = info_command