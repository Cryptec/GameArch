const Joi = require('@hapi/joi')
const nodemailer = require("nodemailer")
var db = require('../Database')
const argon2 = require("argon2")
require('dotenv').config("../")

/**
 * Registers an user.
 * - takes the name, email and UNHASHED password.
 * - takes the response object
 */
const register_user = async function register_user(name, email, password) {
	const SALT = process.env.SALT
	return new Promise(async (resolve, reject) => {
		if (!SALT) {
			console.log(SALT)
			console.log("SALT NOT SET IN .ENV!")
			return resolve(false)
		}
		var hashedPassword = await argon2.hash(password + SALT);
		var sql ='INSERT INTO Users (name, email, password) VALUES (?,?,?)'
		var params =[name, email, hashedPassword]
		db.run(sql, params, function (err, res) {
			if (err) {
				console.log("err" + err)
				resolve(false)
			} else {
				console.log("OK!")
				resolve(true)
			}
		});
	});
}

module.exports = register_user