const router = require('express').Router()
const checkAuthentication = require("../auth/is_authenticated")
var db = require('../Database')
require('dotenv').config()


router.get('/gamecount', checkAuthentication, async function (req, res) {

    var sql = "SELECT COUNT(*) AS total FROM Games WHERE ownage = 'true'"
    var params = []
    db.all(sql, params, (err, total) => {
      if (err) {
        res.status(400).json({ "error": err.message });
        return;
      }
      res.status(200).json(total);
    });

});

router.get('/gametotalcount', checkAuthentication, async function (req, res) {

  var sql = "SELECT COUNT(*) AS total FROM Games"
  var params = []
  db.all(sql, params, (err, total) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.status(200).json(total);
  });

});

router.get('/totalvalue', checkAuthentication, async function (req, res) {

  var sql = "SELECT price FROM Games WHERE ownage = 'true'"
  var params = []
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.status(200).json(rows);
  });

});

router.get('/priceofsold', checkAuthentication, async function (req, res) {

  var sql = "SELECT price FROM Games WHERE saleprice IS NOT ''"
  var params = []
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.status(200).json(rows);
  });

});


router.get('/totalincome', checkAuthentication, async function (req, res) {

  var sql = "SELECT saleprice FROM Games WHERE ownage = 'false'"
  var params = []
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.status(200).json(rows);
  });

});

router.get('/totalvalue/:platform', checkAuthentication, async function (req, res) {
  var data = {
    platform: req.params.platform,
  }
  var params = [data.platform]
  var sql = "SELECT price FROM Games WHERE platform = ? AND ownage = 'true'"
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.status(200).json(rows);
  });

});


router.get('/mostplatform', checkAuthentication, async function (req, res) {

  var sql = "SELECT platform FROM Games WHERE ownage = 'true' GROUP BY platform ORDER BY COUNT(*) DESC LIMIT 1"
          var params = []
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.status(200).json(rows);
  });

});

module.exports = router;