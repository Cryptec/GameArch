process.env["NTBA_FIX_319"] = 1;

const fetch = require("node-fetch")
const { Markup } = require('telegraf');

require('dotenv').config()

const basic_bot_commands = function basic_bot_commands() {

    const uri = process.env.BACKEND_URL

    const bot = require('../bot')


    bot.start((ctx) => {
        const helpMsg = [
            `<b>Welcome, i am your GameArch 🗃 Bot.</b>`,
            ``,
            `<b>Available Commands : </b>`,
            `/start : Start the Bot.`,
            `/help : Show Help Menu.`,
            `/games <b>+ first letter</b>: Lists all owned game titles that start with the mentioned letter.`,
            `/find <b>+ title</b>: Search the game by title.`,
            `/info <b>+ title</b>: show the game info and description.`,
            `/wishlist : show the wishlist.`,
            ``,
            `All commands also work on reply to a message. For example, list all games beginning with the letter 'B', and then reply to a game with /info.`
        ].join("\n");
        return ctx.reply(helpMsg, { parse_mode: "HTML" });
    })

    bot.help((ctx) => {
        const helpMsg = [
            `<b>Available Commands : </b>`,
            `/start : Start the Bot.`,
            `/help : Show Help Menu.`,
            `/games <b>+ first letter</b>: Lists all owned game titles that start with the mentioned letter.`,
            `/find <b>+ title</b>: Search the game by title.`,
            `/info <b>+ title</b>: show the game info and description.`,
            `/wishlist : show the wishlist.`,
            ``,
            `All commands also work on reply to a message. For example, list all games beginning with the letter 'B', and then reply to a game with /info.`
        ].join("\n");
        return ctx.reply(helpMsg, { parse_mode: "HTML" });
    })

}

module.exports = basic_bot_commands