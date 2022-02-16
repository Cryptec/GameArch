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

module.exports = router;