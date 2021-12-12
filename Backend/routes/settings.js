var db = require('../Database')
const router = require('express').Router()
const Joi = require('@hapi/joi')
const argon2 = require("argon2")
const checkAuthentication = require("../auth/is_authenticated")
require('dotenv').config()





router.post('/updatepassword', async function (req, res) {
  var pass = req.body.password
  const SALT = process.env.SALT
  var hashedPassword = await argon2.hash(pass + SALT);
  var data = {
    password: hashedPassword,
    name: req.body.name
  }
  var params = [data.password, data.name]
  db.serialize(() => {
    db.run('UPDATE Users SET password = ? WHERE name = ?', params, function (err) {
      if (err) {
        res.send("Error encountered while updating");
        return res.status(400).json({ error: true });
      }
      return res.json({ "answer": "Success" })
    });
  });
});

router.post('/setcurrency', function(req,res){
  var data = {
    currency: req.body.currency,
    id: req.body.id
}
  var params = [data.currency, data.id]
  db.serialize(()=>{
    db.run('UPDATE Settings SET currency = ? WHERE id = ?', params, function(err){
      if(err){
        res.send("Error encountered while updating");
        return res.status(400).json({ error: true });
      }
      return res.send({success: true});
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