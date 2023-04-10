var express = require('express');
var router = express.Router();
var fetch = require("node-fetch")
var geoip = require('geoip-lite');

router.all('/', async function(req, res){
    var response = await fetch("https://discord.com/api/v9/experiments?with_guild_experiments=true",{
        method: req.method,
    })

    const data = await response.json();
    res.status(response.status).send(data)
});

//export this router to use in our index.js
module.exports = router;