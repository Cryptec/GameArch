var db = require('../Database')
const router = require('express').Router()
const Joi = require('@hapi/joi')
const argon2 = require("argon2")
const passport = require('passport')
const checkAuthentication = require("../auth/is_authenticated")
require('dotenv').config()





router.post('/updateuserdata', checkAuthentication, async function (req, res) {
  var pass = req.body.password
  const SALT = process.env.SALT
  var hashedPassword = await argon2.hash(pass + SALT);
  console.log("Request ---", req.body);
  if (req.body.password !== '') { 
  var data = {
    password: hashedPassword,
    email: req.body.email,
    name: req.body.name
  }
  var params = [data.password, data.email, data.name]
    db.serialize(() => {
      db.run('UPDATE Users SET password = ?, email = ? WHERE name = ?', params, function (err) {
        if (err) {
          res.send("Error encountered while updating");
          return res.status(400).json({ error: true });
        }
        return res.json({ "answer": "Success" })
      });
    });
  } else {
    var data = {
      email: req.body.email,
      name: req.body.name
    }
    var params = [data.email, data.name]
  await db.serialize( () => {
    db.run('UPDATE Users SET email = ? WHERE name = ?', params, function ( err, next) {
      if (err) {
        res.send("Error encountered while updating");
        return res.status(400).json({ error: true });
      } else {
        passport.authenticate('local', function(err, user, info) {
          var user = data.email
          if (err) { return (err); }
          if (!user) { return res.json({"answer":"UserError"}) }
        req.login(user, function(err) {
          if (err) { 
            console.log(err)
            return (err); 
          }
          console.log("relogin")
          return res.json({"answer": "Success", name: data.name, email: data.email});
        });
        })(req, res);
      }
    });
  });
}
});

router.post('/setcurrency', function(req,res){
  var data = {
    currency: req.body.currency,
    theme: req.body.theme,
    id: req.body.id
}
  var params = [data.currency, data.theme, data.id]
  db.serialize(()=>{
    db.run('UPDATE Settings SET currency = ?, theme = ? WHERE id = ?', params, function(err){
      if(err){
        res.send("Error encountered while updating");
        return res.status(400).json({ error: true });
      }
      return res.send({success: true});
    });
  });
});

router.post('/setview', function(req,res){
  var data = {
    view: req.body.view,
    id: req.body.id
}
  var params = [data.view, data.id]
  db.serialize(()=>{
    db.run('UPDATE Settings SET listview = ? WHERE id = ?', params, function(err){
      if(err){
        res.send("Error encountered while updating");
        return res.status(400).json({ error: true });
      }
      return res.send({success: true});
    });
  });
});

router.post('/settheme', function (req, res) {
  var data = {
    theme: req.body.theme,
    id: req.body.id
  }
  var params = [data.theme, data.id]
  db.serialize(() => {
    db.run('UPDATE Settings SET theme = ? WHERE id = ?', params, function (err) {
      if (err) {
        res.send("Error encountered while updating");
        return res.status(400).json({ error: true });
      }
      return res.send({ success: true });
    });
  });
});

router.get("/settingsdata", checkAuthentication, (req, res, next) => {
    var sql = "select * from Settings"
    var params = []
    db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({ "error": err.message });
        return;
      }
      res.status(200).json(rows);
    });
  });

router.get("/setting/:id",checkAuthentication, (req, res, next) => {
    var sql = "select * from Settings where id = ?"
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

  module.exports = router;