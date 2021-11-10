const axios = require('axios')
var db = require('../Database')
const router = require('express').Router()
const checkAuthentication = require("../auth/is_authenticated")
require('dotenv').config()


router.post("/newgame", checkAuthentication, async (req, res, next) => {
    var data = {
        title: req.body.title
    }
    var sql ='INSERT INTO Games (title) VALUES (?)'
    var params =[data.title]
    db.run(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({ "error": err.message });
        return;
      }
      res.status(200).json(rows);
    });
  });

router.get("/gamedata", checkAuthentication, (req, res, next) => {
    var sql = "select * from Games"
    var params = []
    db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({ "error": err.message });
        return;
      }
      res.status(200).json(rows);
    });
  });

router.get("/game/:id",checkAuthentication, (req, res, next) => {
    var sql = "select * from Games where id = ?"
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