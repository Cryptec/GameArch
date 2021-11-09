const router = require('express').Router()

require('dotenv').config()


// Routes
router.get('/games', function (req, res) {
    return res.send('Games');
});

module.exports = router;