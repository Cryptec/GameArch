process.env["NTBA_FIX_319"] = 1;

require('dotenv').config()
const { Telegraf } = require('telegraf');


const BOT_TOKEN = process.env.BOT_TOKEN
const bot = new Telegraf(BOT_TOKEN, { polling: true })

module.exports = bot