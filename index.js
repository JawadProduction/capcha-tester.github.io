const WebSocket = require("ws")
let WSServer = require('ws').Server;
let server = require('http').createServer();
let app = require('./http-server.js');


let wss = new WSServer({

  server: server
});

server.on('request', app);

wss.on("connection", async ws => {
    realWs = ws;
    console.log("new client connected");
    const remoteAuthGatewayUrl = 'wss://remote-auth-gateway.discord.gg/?v=2';
    const socket = await new WebSocket(remoteAuthGatewayUrl, [], {
        headers: {
            'Origin': 'https://discord.com',
        },
        port: 8888
    });
    socket.on('error', error => {
        console.log(error);
    });
    
    socket.on('close', (code, reason) => {
        console.log(reason.toString());
    });
    
    socket.on("message", (data) => {
        console.log(data)
        if(ws != undefined){
            ws.send(data.toString())
        }
        
    })
    async function rawr(data)
    {
        while(socket.readyState === socket.OPEN) //
        {
            console.log("sent data")
            await socket.send(data.toString())
            break;
        }
    }
    socket.on("open",() => {
        console.log("socket has been opened >.<")
    })
    ws.on("message", async data => {
        console.log(`client has sent: ${data}`)
        const int = setInterval(async function() {
            if(socket.readyState === socket.OPEN)
            {
                await rawr(data)
                clearInterval(int)
            }
            
        },100)
        
    });
    ws.send("hello")


    ws.on("close", () => {
        console.log("the client has connected");
    });
    ws.onerror = function () {
        console.log("errowr")
    }
});
console.log("The WebSocket server is running on port 8080");


server.listen(8080, function() {

    console.log(`http/ws server listening on ${process.env.PORT}`);
});