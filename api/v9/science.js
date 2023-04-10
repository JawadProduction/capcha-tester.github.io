var express = require('express');
var router = express.Router();
var fetch = require("node-fetch")
var geoip = require('geoip-lite');

router.all('/', async function(req, res){
    var ip = req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    var geo = geoip.lookup(ip);
    if(req.method == "GET") return res.status(400)
    var response = await fetch("https://discord.com/api/v9/science",{
        method: req.method,
        body: JSON.stringify(req.body),
        headers: {'Content-Type': 'application/json'},
    })
    if(response.data)
    {
        const data = await response.json();
    
        res.status(response.status).send(data)
    }

});


//export this router to use in our index.js
module.exports = router;