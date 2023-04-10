var express = require('express');
var router = express.Router();
var fetch = require("node-fetch")

router.all('/', async function(req, res){
    if(req.method == "GET") return res.status(400)
    var response = await fetch("https://discord.com/cdn-cgi/challenge-platform/h/g/cv/result/79b09e935c502a4d",{
        method: req.method,
        body: JSON.stringify(req.body),
        headers: {'Content-Type': 'application/json'}
    })
    //const data = await response.json();
    //res.status(response.status).send(data)
    //console.log(data)

});

//export this router to use in our index.js
module.exports = router;