const express = require('express');
const enableWs = require('express-ws');

const app = express();
let wsInstance = {};
enableWs(app)

app.ws('/echo', ws => {
    wsInstance = ws;
    ws.on('message', msg => ws.send(msg));
})

app.get('/message', (request, response) => {
    if (wsInstance.send)
        wsInstance.send('oi');
    response.send('Hello from Express!')
})