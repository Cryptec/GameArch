const db = require('../Database');

/**
 * Returns true if row private exists
 * - this is not really a reliable way to do this, but likely the easiest for now.
 */
const check_db_state = function (callback) {
    
    console.log("[CHECKING DATABASE STATE...]")
    var sql = "SELECT private FROM Settings LIMIT 1"
    db.get(sql, (err, col) => {
        if (col)
            return console.log('column private exists')
        else
            console.log("column private don´t exist")
            var sql = 'ALTER TABLE Settings ADD COLUMN private text'
            db.run(sql, function (err) {
                if (err) {
                    console.log(err)
                    return (err)
                } else {
                    console.log("DB outdated, add column: private")
                    db.run('UPDATE Settings SET private = ?', ['enabled'], function (err, res) {
                        if (err) {
                            console.log("Error encountered while updating");
                            return(err);
                        }
                        return console.log("successfully added column private")
                    });
                } 
            })
        }) 
}
module.exports = check_db_state