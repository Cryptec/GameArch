const db = require('../Database');

/**
 * Returns true if it is the first start
 * - checks for the first start by looking for an user named 'admin'
 * - this is not really a reliable way to do this, but likely the easiest for now.
 */
const check_first_start = function(callback) {
	db.get(`SELECT * FROM Employees WHERE name = ?`,['admin'], async (err, user) => {
		if (user)
			callback(false)
		else
			callback(true)
	})
}

module.exports = check_first_start