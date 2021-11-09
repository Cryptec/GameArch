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
            games text UNIQUE
            )`,
            (err) => {
                if (err) {
                    // Table already created
                } else {
                    console.log("First start, Create Games Table!")
                }
            })
    }
});



module.exports = db