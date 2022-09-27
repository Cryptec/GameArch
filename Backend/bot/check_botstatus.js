require('dotenv').config()

const check_botstatus = function (callback) {
    
        if (process.env.TELEGRAM_BOT === 'disabled')
            callback(false)
        else if (process.env.TELEGRAM_BOT === 'enabled')
            callback(true)
        else  
            callback(false)
    
}

module.exports = check_botstatus