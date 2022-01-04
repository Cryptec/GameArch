const axios = require('axios')
var db = require('../Database')
const router = require('express').Router()
const multer = require('multer')
const checkAuthentication = require("../auth/is_authenticated")
require('dotenv').config()

const upload = multer({
  dest: './public/uploads/',
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg|PNG)$/)) {
      cb(new Error('Please upload an image.'))
    }
    cb(undefined, true)
  }
}).single("file");

router.post("/newgame", checkAuthentication, upload, async (req, res, next) => {
  console.log("Request ---", req.body);
  if (req.file !== undefined) {
    console.log("Request file ---", req.file);
    console.log("filename is:", req.file.filename);
    var data = {
      title: req.body.title,
      price: req.body.price,
      platform: req.body.platform,
      ownage: req.body.ownage,
      region: req.body.region,
      description: req.body.description,
      id: req.body.id,
      filename: req.file.filename
    }
    var sql = 'INSERT INTO Games (title, price, platform, ownage, filename, region, description) VALUES (?, ?, ?, ?, ?, ?, ?)'
    var params = [data.title, data.price, data.platform, data.ownage, data.filename, data.region, data.description]
  } else if (req.file === undefined) {
    var data = {
      title: req.body.title,
      price: req.body.price,
      platform: req.body.platform,
      ownage: req.body.ownage,
      region: req.body.region,
      description: req.body.description,
      id: req.body.id,
      filename: "null"
    }
    var sql = 'INSERT INTO Games (title, price, platform, ownage, filename, region, description) VALUES (?, ?, ?, ?, ?, ?, ?)'
    var params = [data.title, data.price, data.platform, data.ownage, data.filename, data.region, data.description]
  }
    db.run(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({ "error": err.message });
        return;
      }
      return res.send({success: true});
    });
  });

router.post("/editgame", checkAuthentication, upload, async (req, res, next) => {
  console.log("Request ---", req.body);
  if (req.file !== undefined) {
  console.log("Request file ---", req.file);
  console.log("filename is:", req.file.filename);
  var data = {
    title: req.body.title,
    price: req.body.price,
    platform: req.body.platform,
    ownage: req.body.ownage,
    region: req.body.region,
    description: req.body.description,
    id: req.body.id,
    filename: req.file.filename
  }
  var params = [data.title, data.price, data.platform, data.ownage, data.filename, data.region, data.description, data.id]
  var sql = 'UPDATE Games SET title = ?, price = ?, platform = ?, ownage = ?, filename = ?, region = ?, description = ? WHERE id = ?'
} else if (req.file === undefined) {
  var data = {
    title: req.body.title,
    price: req.body.price,
    platform: req.body.platform,
    ownage: req.body.ownage,
    region: req.body.region,
    description: req.body.description,
    id: req.body.id
  }
  var params = [data.title, data.price, data.platform, data.ownage, data.region, data.description, data.id]
  var sql = 'UPDATE Games SET title = ?, price = ?, platform = ?, ownage = ?, region = ?, description = ? WHERE id = ?'
}
  db.run(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    console.log("Successfully edited data");
    return res.send({ success: true });
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

router.delete("/game/:id", checkAuthentication, (req, res, next) => {
  db.run(
    'DELETE FROM Games WHERE id = ?',
    req.params.id,
    function (err, result) {
      if (err) {
        res.status(400).json({ "error": res.message })
        return;
      }
      res.status(200).json({ "message": "deleted", changes: this.changes })
    });
})

router.post('/removeimage', function (req, res) {
  var data = {
    filename: req.body.filename,
    id: req.body.id
  }
  var params = [data.filename, data.id]
  db.serialize(() => {
    db.run('UPDATE Games SET filename = ? WHERE id = ?', params, function (err) {
      if (err) {
        res.send("Error encountered while updating");
        return res.status(400).json({ error: true });
      }
      console.log("Successfully removed image");
      return res.send({ success: true });
    });
  });
});

  module.exports = router;