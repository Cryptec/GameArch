var db = require('../Database')
const router = require('express').Router()

require('dotenv').config()

router.get("/:id/detail/:title", (req, res, next) => {
    var sql = "select * from Games where title = ? AND id = ?"
    var params = [req.params.title, req.params.id]

    db.get(`SELECT * FROM Settings WHERE private = ?`, ['disabled'], async (err, setting) => {
    if (setting) {
      db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({ "error": err.message });
          return;
        }
        return res.status(200).json(row);
      });
     }
    else {
      db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({ "error": err.message });
          return;
        }
        return res.status(200).json({
          id: row.id,
          filename: row.filename,
          title: row.title,
          price: "hidden",
          saleprice: row.saleprice,
          purchasedate: row.purchasedate,
          description: row.description,
          region: row.region,
          released: row.released,
          ownage: row.ownage,
          manual: row.manual,
          box: row.box,
          isownage: row.ownage,
          ismanual: row.manual,
          isbox: row.box,
          platform: row.platform,
          wishlist: row.iswishlist,
          stars: row.stars,
          gameTitle: row.title
          });
      });
    }
    }) 
});

router.get("/wishlist/:id/detail/:title", (req, res, next) => {
  var sql = "select * from Games where title = ? AND id = ? AND iswishlist = 'true'"
  var params = [req.params.title, req.params.id]
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.status(200).json(row);
  });
})

router.get("/public/currency", (req, res, next) => {
    var params = []
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

router.get("/public/resstate", (req, res, next) => {
  var sql = "select resolution from Settings"
  var params = []
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.status(200).json(rows);
  });
});

router.get("/public/gamelist/:letter", (req, res, next) => {
  var sql = "SELECT title FROM Games WHERE title LIKE ? || '%' AND ownage = 'true'"
  var params = [req.params.letter]
  db.all(sql, params, (err, rows) => {
    if (rows) {
      return res.status(200).json(rows);
    } else if (!rows) {
      return res.json({ "answer": "NoGame" })
    } else if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
  });
});

router.get("/public/game/:title", (req, res, next) => {
  var sql = "select * from Games where title = ?"
  var params = [req.params.title]
  db.get(sql, params, (err, row) => {
    if (row) {
      res.status(200).json(row);
    } else if (!row) {
      console.log("Dont exist")
      return res.json({ "answer": "NoGame" })
    } else if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
  });
});

module.exports = router;