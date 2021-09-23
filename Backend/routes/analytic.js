const axios = require('axios')
const router = require('express').Router()
const checkAuthentication = require("../auth/is_authenticated")
require('dotenv').config()

// Routes
router.get('/ping', function (req, res) {
    return res.send('pong');
});

router.get('/twitter', checkAuthentication, async function (req, res) {
    
    var config = {
        method: 'get',
        url: 'https://api.twitter.com/1.1/users/show.json?screen_name=einfachiota',
        headers: { 
          "Authorization": `Bearer ${process.env.TWITTER_BEARER_TOKEN}`
        }
      };
      
      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        var data =[response.data["followers_count"]]
        return res.status(200).json(data);
      })
      .catch(function (error) {
        return res.status(200).json({success: false});
      });
});

router.get('/discord', checkAuthentication, function (req, res) {
    var data = {
        discordusers: 520,
    }
    var data =[data.discordusers]
    return res.status(200).json(data);
});
router.get('/telegram', checkAuthentication, function (req, res) {
    var data = {
        telegramusers: 100,
    }
    var data =[data.telegramusers]
    return res.status(200).json(data);
});
module.exports = router;