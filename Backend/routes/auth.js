const router = require('express').Router()
const Joi = require('@hapi/joi')
var db = require('../Database')
const register_user = require("../database/register_user")
const bcrypt = require('bcryptjs')
const nodemailer = require("nodemailer")
const passport = require('passport')
const checkAuthentication = require("../auth/is_authenticated")

require('dotenv').config()

// Email
const mailhost = process.env.MAIL_HOST
const mailport = process.env.MAIL_PORT
const mailemail = process.env.MAIL_EMAIL
const mailpass = process.env.MAIL_PASSWORD

const contactEmail = nodemailer.createTransport({
  host: mailhost,
  port: mailport,
  auth: {
    user: mailemail,
    pass: mailpass,
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});

// Routes
router.post('/register', async (req, res) => {

  // Validation
  const schema = {
    name: Joi.string().min(4).required(),
    email: Joi.string().min(4).required().email(),
    password: Joi.string().min(4).required(),
  }

  // Validate
  const {error} = Joi.validate(req.body, schema)
  if (error){
    res.json({ "answer": "password_too_short"});
    res.status(400)
  } else {
  const result = await register_user(req.body.name, req.body.email, req.body.password, res)
  res.json({success: result, "answer": "successfully_registered"})
  }
})

router.post('/forgot', async (req, res) => {
  var data = {
    email: req.body.email
}
  var params = [data.email]
  var sql = "SELECT * FROM Users WHERE email =? LIMIT 1"
  db.get(sql, params, (err, row) => {
    if (row) {
      res.send({success: true});
      console.log("Exist")
      const mail = {
        from: mailemail,
        to: data.email,
        subject: "Reset Password",
        html: `<p>Some forgot Text</p>`,
      };
      contactEmail.sendMail(mail, (error) => {
        if (error) {
          res.json({ status: "failed" });
        } else {
          res.json({ status: "sent" });
        }
      });
      return;
    } else if (!row)
    return res.json({"answer":"UserError"})
    console.log("Dont exist")
  });
});

/**
 * Get all employees
 */
router.get("/users", checkAuthentication, (req, res, next) => {
    var sql = "select * from Users"
    var params = []
    db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({ "error": err.message });
        return;
      }
      res.status(200).json(rows);
    });
  });
  
/**
 * Get employee by id
 */
router.get("/user/:id",checkAuthentication, (req, res, next) => {
    var sql = "select * from Users where id = ?"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "answer":"success",
            "data":row
        })
      });
  });

/**
 * Login route
 */

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.json({"answer":"UserError"}) }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.send({success: true, name: user.name});
    });
  })(req, res, next);
});

/**
 * delete employee by id
 */
router.delete("/api/user/:id", checkAuthentication, (req, res, next) => {
  db.run(
      'DELETE FROM Users WHERE id = ?',
      req.params.id,
      function (err, result) {
          if (err){
              res.status(400).json({"error": res.message})
              return;
          }
          res.status(200).json({"message":"deleted", changes: this.changes})
  });
})


module.exports = router;