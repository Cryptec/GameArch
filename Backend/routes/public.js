var db = require('../Database')
const router = require('express').Router()

require('dotenv').config()

router.get("/:id/detail/:title", (req, res, next) => {
    var sql = "select * from Games where title = ? AND id = ?"
    var params = [req.params.title, req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.status(200).json(row);
    });
});

router.get("/public/currency", (req, res, next) => {
    var params = [req.params.currency]
    var sql = "select currency from Settings"
    db.all(sql, params, (err, row) => {
      if (err) {
        res.status(400).json({ "error": err.message });
        return;
      }
      res.status(200).json(row);
    });
  });

router.get("/public/wishlist", (req, res, next) => {
  var sql = "select * from Games WHERE iswishlist = 'true'"
  var params = []
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.status(200).json(rows);
  });
});

router.get("/public/wishlist/:platform", (req, res, next) => {
  var data = {
    platform: req.params.platform,
  }
  var params = [data.platform]
  var sql = "select * from Games WHERE platform = ? AND iswishlist = 'true'"
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.status(200).json(rows);
  });
});

module.exports = router;