const router = require('express').Router()
const Joi = require('@hapi/joi')
var db = require('../Database')
const register_user = require("../database/register_user")
const bcrypt = require('bcryptjs')
const nodemailer = require("nodemailer")
const passport = require('passport')
const checkAuthentication = require("../auth/is_authenticated")

require('dotenv').config()

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

/**
 * Get all employees
 */
router.get("/employees", checkAuthentication, (req, res, next) => {
    var sql = "select * from Employees"
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
router.get("/employees/:id",checkAuthentication, (req, res, next) => {
    var sql = "select * from Employees where id = ?"
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
      return res.send({success: true});
    });
  })(req, res, next);
});

/**
 * delete employee by id
 */
router.delete("/api/employee/:id", checkAuthentication, (req, res, next) => {
  db.run(
      'DELETE FROM Employees WHERE id = ?',
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