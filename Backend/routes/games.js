const axios = require('axios')
var db = require('../Database')
const fs = require('fs')
const router = require('express').Router()
const multer = require('multer')
const checkAuthentication = require("../auth/is_authenticated")
require('dotenv').config()

const imagepath = './public/uploads/'

const upload = multer({
  dest: imagepath,
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
      manual: req.body.manual,
      box: req.body.box,
      region: req.body.region,
      released: req.body.released,
      description: req.body.description,
      id: req.body.id,
      iswishlist: req.body.iswishlist,
      filename: req.file.filename,
      stars: req.body.stars
    }
    var sql = 'INSERT INTO Games (title, price, platform, ownage, manual, box, filename, region, released, description, iswishlist, stars) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    var params = [data.title, data.price, data.platform, data.ownage, data.manual, data.box, data.filename, data.region, data.released, data.description, data.iswishlist, data.stars]
  } else if (req.file === undefined) {
    var data = {
      title: req.body.title,
      price: req.body.price,
      platform: req.body.platform,
      ownage: req.body.ownage,
      manual: req.body.manual,
      box: req.body.box,
      region: req.body.region,
      released: req.body.released,
      description: req.body.description,
      id: req.body.id,
      iswishlist: req.body.iswishlist,
      stars: req.body.stars,
      filename: "null"
    }
    var sql = 'INSERT INTO Games (title, price, platform, ownage, manual, box, filename, region, released, description, stars, iswishlist) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    var params = [data.title, data.price, data.platform, data.ownage, data.manual, data.box, data.filename, data.region, data.released, data.description, data.stars, data.iswishlist]
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
    manual: req.body.manual,
    box: req.body.box,
    region: req.body.region,
    released: req.body.released,
    description: req.body.description,
    stars: req.body.stars,
    id: req.body.id,
    filename: req.file.filename,
    oldfilename: req.body.oldfilename
  }
  const removeimagepath = imagepath + data.oldfilename
  fs.unlink(removeimagepath, (err) => {
    if (err) {
      console.error(err)
      return
    }
    console.log("successfully deleted:" + data.oldfilename)
  })
  var params = [data.title, data.price, data.platform, data.ownage, data.manual, data.box, data.filename, data.region, data.released, data.description, data.stars,data.id]
  var sql = 'UPDATE Games SET title = ?, price = ?, platform = ?, ownage = ?, manual = ?, box = ?, filename = ?, region = ?, released = ?, description = ?, stars = ? WHERE id = ?'
} else if (req.file === undefined) {
  var data = {
    title: req.body.title,
    price: req.body.price,
    platform: req.body.platform,
    ownage: req.body.ownage,
    manual: req.body.manual,
    box: req.body.box,
    region: req.body.region,
    released: req.body.released,
    description: req.body.description,
    stars: req.body.stars,
    id: req.body.id
  }
    var params = [data.title, data.price, data.platform, data.ownage, data.manual, data.box, data.region, data.released, data.description, data.stars, data.id]
  var sql = 'UPDATE Games SET title = ?, price = ?, platform = ?, ownage = ?, manual = ?, box = ?, region = ?, released = ?, description = ?, stars = ? WHERE id = ?'
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
        res.status(200).json(row);
      });
  });

router.delete("/game/:id", checkAuthentication, (req, res, next) => {
  var data = {
    filename: req.body.filename,
    id: req.body.id
  }
  const removeimagepath = imagepath + data.filename
  fs.unlink(removeimagepath, (err) => {
    if (err) {
      console.error(err)
      return
    }
    console.log("successfully deleted:" + data.filename)
  })
  db.run(
    'DELETE FROM Games WHERE id = ?',
    req.params.id,
    function (err, result) {
      if (err) {
        res.status(400).json({ "error": res.message })
        return;
      }
      console.log("successfully deleted game")
      return res.send({ success: true });
    });
})

router.post('/removeimage', checkAuthentication, function (req, res) {
  var data = {
    filename: req.body.filename,
    oldfilename: req.body.oldfilename,
    id: req.body.id
  }
  const removeimagepath = imagepath + data.oldfilename
  fs.unlink(removeimagepath, (err) => {
    if (err) {
      console.error(err)
      return
    }
    console.log("successfully deleted:" + data.oldfilename)
  })
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

router.post("/setwishlist/:id", checkAuthentication, (req, res, next) => {
  var data = {
    iswishlist: req.body.iswishlist,
    id: req.body.id
  }
  var params = [data.iswishlist, data.id]
  db.run(
    'UPDATE Games SET iswishlist = ? WHERE id = ?',
    params,
    function (err, row, result) {
      if (err) {
        res.status(400).json({ "error": res.message })
        return;
      }
      console.log("Successfully set wishlist state");
      return res.send({ success: true, "answer": "success", row });
    });
})

router.get("/wishlist", checkAuthentication, (req, res, next) => {
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


  module.exports = router;