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

module.exports = router;