const router = require('express').Router()

require('dotenv').config()


// Routes
router.get('/meetingnotes', function (req, res) {
    return res.send('meetingnote');
});

module.exports = router;