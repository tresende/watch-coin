const express = require('express');
const enableWs = require('express-ws');

const app = express();
let wsInstance = {};
enableWs(app)

app.ws('/echo', ws => {
    wsInstance = ws;
    ws.on('message', msg => ws.send(msg));
})

app.get('/message', (req, response) => {
    if (wsInstance.send)
        wsInstance.send('oi');
    console.log('recived!');
    var user = {
        agent: req.header('user-agent'), // User Agent we get from headers
        referrer: req.header('referrer'), //  Likewise for referrer
        ip: req.header('x-forwarded-for') || req.connection.remoteAddress, // Get IP - allow for proxy
        screen: { // Get screen info that we passed in url post data
            width: req.params['width'],
            height: req.params['height']
        }
    };
    console.log(user);
    // const script = '<img src="https://atlas-content-cdn.pixelsquid.com/stock-images/8-bit-mario-game-character-mdaWkw1-600.jpg" /><script>document.querySelector("body").onclick = function() {location.reload()}</script>';
    const script = '<style>body{background:black;}</style><meta name="viewport" content="width=device-width, initial-scale=1.0"><img width="100%" src="https://i.ya-webdesign.com/images/retro-mario-png-7.png" /><script>document.querySelector("body").onclick = function () { var xmlHttp = new XMLHttpRequest(); xmlHttp.open("GET", "https://09093cd1.ngrok.io/message", false); xmlHttp.send(null); }</script>';
    response.send(script)
})

app.listen(3000);
