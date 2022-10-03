process.env["NTBA_FIX_319"] = 1;

const fetch = require("node-fetch")
const { Markup } = require('telegraf');

require('dotenv').config()

const basic_bot_commands = function basic_bot_commands() {

    const uri = process.env.BACKEND_URL

    const bot = require('../bot')


    bot.start((ctx) => {
        const helpMsg = [
            `<b>Available Commands : </b>`,
            `/start : Start the Bot`,
            `/help : Show Help Menu.`,
            `/find + title : Search the game`,
            `/info + title : show the game info and description`,
            `/wishlist : show the wishlist`,
        ].join("\n");
        return ctx.reply(helpMsg, { parse_mode: "HTML" });
    })

    bot.help((ctx) => {
        const helpMsg = [
            `<b>Available Commands : </b>`,
            `/start : Start the Bot`,
            `/help : Show Help Menu.`,
            `/find + title : Search the game`,
            `/info + title : show the game info and description`,
            `/wishlist : show the wishlist`,
        ].join("\n");
        return ctx.reply(helpMsg, { parse_mode: "HTML" });
    })

}

module.exports = basic_bot_commands