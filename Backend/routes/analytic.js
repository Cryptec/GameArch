const router = require('express').Router()
const checkAuthentication = require("../auth/is_authenticated")
var db = require('../Database')
require('dotenv').config()


router.get('/gamecount', checkAuthentication, async function (req, res) {

    var sql = "SELECT COUNT(*) FROM Games WHERE ownage = 'true'"
    var params = []
    db.get(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({ "error": err.message });
        return;
      }
      res.status(200).json(rows);
    });

});

module.exports = router;