const router = require('express').Router()
const Joi = require('@hapi/joi')
var db = require('../Database')
const register_user = require("../database/register_user")
const jwt = require('jsonwebtoken')
const nodemailer = require("nodemailer")
const argon2 = require("argon2")
const passport = require('passport')
const checkAuthentication = require("../auth/is_authenticated")

require('dotenv').config()

//JWT
const JWT_SECRET = process.env.JWT_SECRET
const ORIGIN = process.env.CORS_ORIGIN
const FRONTEND_URL = process.env.FRONTEND_URL

// Email
const mailhost = process.env.MAIL_HOST
const mailport = process.env.MAIL_PORT
const mailemail = process.env.MAIL_EMAIL
const mailpass = process.env.MAIL_PASSWORD
const BACKEND_URL = process.env.BACKEND_URL

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

      const linksecret = JWT_SECRET + row.password
      const payload = {
                email: data.email,
                id: row.id
                }
      const token = jwt.sign(payload, linksecret, {expiresIn: '30m'})
      const link = `${BACKEND_URL}/api/reset-password/${row.id}/${token}`
      const mail = {
        from: mailemail,
        to: data.email,
        subject: "Reset Password",
        html: `<p>
                  <p>Hi there,</p>
                  <p>Somebody tried to reset your password. If it was you, please follow the link below to do so.</p>
                  <p><b>PLEASE</b> verify that the link points to your gameArch installation!</p>
                  <p>${link}</p>
                  <p>your Mailrobot</p>
              </p>`
      };
      contactEmail.sendMail(mail, (error) => {
        if (error) {
          res.json({ status: "failed" });
        } else {
          res.json({ status: "sent" });
        }
      });
      console.log(link)
      return;
    } else if (!row)
    return res.json({"answer":"UserError"})
    console.log("Dont exist")
  });
});

router.get("/reset-password/:id/:token", (req, res, next) => {
  var data = {
    id: req.params.id,
    token: req.params.token
  }
  var sql = "select * from Users where id = ? LIMIT 1"
  var params = [data.id]
  db.get(sql, params, (err, row) => {

      if (!row) {
        res.send('ID not found...')
        return;
      } 

      const linksecret = JWT_SECRET + row.password
      try {
        const payload = jwt.verify(data.token, linksecret)
        //res.send(req.params)
        res.render('test', {email: row.email})
      } catch (error) {
        console.log(error.message)
        res.send(error.message)
      }
      
    });
});


router.post("/reset-password/:id/:token", async (req, res, next) => {
  var data = {
    id: req.params.id,
    token: req.params.token,
    password: req.body.password,
    confirm_password: req.body.confirm_password
  }
  var sql = "select * from Users where id = ? LIMIT 1"
  var params = [data.id]
  db.get(sql, params, async (err, row) => {

    if (!row) {
      res.send('ID not found...')
      return;
    }
    const linksecret = JWT_SECRET + row.password

    try {
      const token = data.token
      const payload = jwt.verify(token, linksecret)
      var pass = data.password
      const SALT = process.env.SALT
      var hashedPassword = await argon2.hash(pass + SALT);

      var postparams = [hashedPassword, data.id]
      db.serialize(() => {
        db.run('UPDATE Users SET password = ? WHERE id = ?', postparams, function (err) {
          if (err) {
            res.send("Error encountered while updating");
            return res.status(400).json({ error: true });
          }
          res.status(301).redirect(`${FRONTEND_URL}/redirect`)
        });
      });

    } catch (error) {
      console.log(error.message)
      res.send(error.message)
    }

  });
});

/**
 * Get all users
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
      return
    });
  });
  
/**
 * Get user by id
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
      return res.send({success: true, name: user.name, email: user.email});
    });
  })(req, res, next);
});

/**
 * delete employee by id
 */
router.delete("/user/:id", checkAuthentication, (req, res, next) => {
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