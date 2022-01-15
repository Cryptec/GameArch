var sqlite3 = require('sqlite3').verbose()
const bcrypt = require('bcryptjs')

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE Users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text UNIQUE, 
            email text UNIQUE, 
            password text, 
            CONSTRAINT email_unique UNIQUE (email),
            CONSTRAINT name_unique UNIQUE (name)
            )`,
            (err) => {
                if (err) {
                    // Table already created
                } else {
                    console.log("First start, Create Members Table!")
                }
            })

        db.run(`CREATE TABLE Games (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title text,
            platform text,
            price text,
            region text,
            description text,
            filename text,
            iswishlist text, 
            stars text,
            released text,
            ownage text,
            box text,
            manual text
            )`,
            (err) => {
                if (err) {
                    // Table already created
                } else {
                    console.log("First start, Create Games Table!")
                }
            })
        
        db.run(`CREATE TABLE Settings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            currency text UNIQUE,
            listview text,
            theme text,
            CONSTRAINT currency_unique UNIQUE (currency)
            )`,
            (err) => {
                if (err) {
                    // Table already created
                } else {
                    var initialSettings = 'INSERT INTO Settings (currency, listview, theme) VALUES (?, ?, ?)'
                    db.run(initialSettings, "EUR", "false", "light")
                    console.log("First start, Create Settings Table!")
                }
            })
    }
});



module.exports = db