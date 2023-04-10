var express = require('express');
var router = express.Router();
var fetch = require("node-fetch")
var geoip = require('geoip-lite');

router.all('/', async function(req, res){
    var response = await fetch("https://discord.com/api/v9/users/@me",{
        method: req.method,
        headers: {
            "authorization": req.headers["authorization"],
            "x-super-properties": req.headers["x-super-properties"]
        }
    })

    const data = await response.json();
    res.status(response.status).send(data)
});

router.all('/remote-auth/login', async function(req, res){
    if(req.method == "GET") return res.status(400)
    console.log(req.body)
    var lul = await fetch("https://discord.com/api/v9/users/@me/remote-auth/login",{
        method: req.method,
        body: JSON.stringify(req.body),
        headers: {"Content-Type": "application/json"}
    })
    
    var data = await lul.json()
    res.status(lul.status).send(data)
});

//export this router to use in our index.js
module.exports = router;