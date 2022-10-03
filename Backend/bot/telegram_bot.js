process.env["NTBA_FIX_319"] = 1;

const bot = require('./bot');

const basic_bot_commands = require('./commands/basic_bot_commands');
const by_letter = require('./commands/by_letter_command');
const find_command = require('./commands/find_command');
const info_command = require('./commands/info_command');
const wishlist_command = require('./commands/wishlist_command')

require('dotenv').config()


const telegram_bot = function telegram_bot() {

    basic_bot_commands()
    info_command()
    find_command()
    wishlist_command()
    by_letter()

}
bot.launch()


module.exports = telegram_bot